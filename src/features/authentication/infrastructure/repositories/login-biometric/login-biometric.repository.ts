import { AuthenticationEntity } from '../../../domain/entities/authentication-entity'
import { AuthenticationPorts } from '../../../domain/ports/authentication.ports'
import { RequiredFieldException } from '../../../../../shared/domain/exceptions/required-field.exception'
import { InvalidFieldFormatException } from '../../../../../shared/domain/exceptions/invalid-field-format.exception'
import { RequiredAllFieldsException } from '../../../../../shared/domain/exceptions/required-all-fields.exception'
import { HttpService } from '../../../../../shared/infrastructure/services/http-service'
import { AuthenticationLocalStorageService } from '../../services/authentication-local-storage.service'
import { AxiosError } from 'axios'
import i18next from 'i18next'
import { BiometricsService } from '../../services/biometrics.service'
import { GetAuthStateUsecase } from '../../../application/get-auth-state/get-auth-state.usecase'
import { LocalAuthCredentialsRepository } from '../local-auth-credentials.repository/local-auth-credentials.repository'
import { IntegerIdVO } from '../../../../../shared/domain/value-objects/integer-id.vo'
import { EmailVO } from '../../../../../shared/domain/value-objects/email.vo'
import { ActiveVO } from '../../../../../shared/domain/value-objects/active.vo'
import { UserEntity } from '../../../../user/domain/entities/user.entity'

interface LoginResponse {
  status: number
  data: {
    data: {
      token: string
      user: {
        userId: string
        userEmail: string
        userPassword: string
        userPinCode: string
        userActive: boolean
        personId: string
        roleId: string
        pinCodeExpiresAt: string
        businessAccess: boolean
        createdAt: string
        updatedAt: string
        deletedAt: string | null
      }
    }
    message?: string
  }
}

interface SessionResponse {
  status: number
  data: {
    person: {
      personFirstname: string
    }
  }
}

/**
 * Repositorio que implementa la comunicación con la API para procesos de autenticación mediante biometría
 * @class LoginBiometricRepository
 */
export class LoginBiometricRepository implements Pick<AuthenticationPorts, 'login'> {
  private readonly authCredentials: GetAuthStateUsecase

  /**
   * Constructor de la clase LoginBiometricRepository
   */
  constructor() {
    const authCredentialsRepository = new LocalAuthCredentialsRepository()
    this.authCredentials = new GetAuthStateUsecase(authCredentialsRepository)
  }

  /**
   * Realiza el proceso de autenticación del usuario contra la API mediante las credenciales de inicio de sesión almacenadas en el almacenamiento local
   * <br />
   * - Se almacena el token de autenticación en el almacenamiento local para futuras solicitudes.
   * @returns {Promise<AuthenticationEntity>} Promesa que resuelve a un objeto Authentication con los datos del usuario y token de sesión
   * @throws { RequiredAllFieldsException } si no se proporcionan las credenciales
   * @throws { RequiredFieldException } si algún campo de las credenciales está vacío
   * @throws { InvalidFieldFormatException } si algún campo de las credenciales tiene formato inválido
   * @throws { Error } si hay problemas de conexión con la API
   */
  async login(): Promise<AuthenticationEntity> {
    try {
      const biometricService = new BiometricsService()
      const isBiometricAvailable = await biometricService.isBiometricAvailable()

      if (!isBiometricAvailable) {
        throw new Error(i18next.t('errors.biometricNotAvailable'))
      }

      const biometricAuth = await biometricService.authenticate()

      if (!biometricAuth) {
        throw new Error(i18next.t('errors.biometricAuthenticationError'))
      }

      const authCredentials = await this.authCredentials.run()

      if (!authCredentials) {
        throw new Error(i18next.t('errors.authenticationGetStorageError'))
      }

      const credentials = {
        email: authCredentials.props.loginCredentials?.email || '',
        password: authCredentials.props.loginCredentials?.password || ''
      }

      if (!credentials) {
        throw new RequiredAllFieldsException()
      }

      this.validateCredentials(credentials.email, credentials.password)

      const response: LoginResponse = await HttpService.post('/auth/login', {
        userEmail: credentials.email,
        userPassword: credentials.password
      })

      if (response.status !== 200) {
        throw new Error(response.data.message)
      }

      const responseData = response.data.data

      if (!responseData.token) {
        throw new Error(i18next.t('errors.loginFailedNoTokenProvided'))
      }

      HttpService.setBearerToken(responseData.token)

      const userName = await this.getSessionUserName()
      const user = {
        id: new IntegerIdVO(parseInt(responseData.user.userId)),
        email: new EmailVO(responseData.user.userEmail),
        password: responseData.user.userPassword,
        token: responseData.token,
        pinCode: responseData.user.userPinCode,
        active: new ActiveVO(responseData.user.userActive ? 1 : 0),
        personId: responseData.user.personId ? new IntegerIdVO(parseInt(responseData.user.personId)) : null,
        roleId: responseData.user.roleId ? new IntegerIdVO(parseInt(responseData.user.roleId)) : null,
        pinCodeExpiresAt: responseData.user.pinCodeExpiresAt
          ? new Date(responseData.user.pinCodeExpiresAt)
          : null,
        businessAccess: responseData.user.businessAccess ? 'true' : 'false',
        createdAt: responseData.user.createdAt
          ? new Date(responseData.user.createdAt)
          : null,
        updatedAt: responseData.user.updatedAt
          ? new Date(responseData.user.updatedAt)
          : null,
        deletedAt: responseData.user.deletedAt
          ? new Date(responseData.user.deletedAt)
          : null
      }

      const newAuthentication = new AuthenticationEntity({
        authState: {
          user: new UserEntity(user),
          token: responseData.token,
          isAuthenticated: true
        },
        userName: userName,
        loginCredentials: credentials,
        createdAt: new Date()
      })

      if (
        !newAuthentication ||
        !newAuthentication.props.authState?.isAuthenticated
      ) {
        throw new Error(i18next.t('errors.loginFailedNoAuthenticationStatus'))
      }

      const authenticationLocalStorageService =
        new AuthenticationLocalStorageService()

      await authenticationLocalStorageService.localStoreAuthentication(newAuthentication)
      await authenticationLocalStorageService.localStoreAuthenticationState(newAuthentication)

      return newAuthentication
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const errorMessage = (error?.response?.data?.message ||
          i18next.t('errors.loginFailed')) as string
        throw new Error(errorMessage)
      }

      throw new Error(
        error instanceof Error
          ? error.message
          : i18next.t('errors.connectionError')
      )
    }
  }

  /**
   * ==========================================================================================================================
   * Funciones privadas
   * ==========================================================================================================================
   */

  /**
   * Obtiene el nombre del usuario de la sesión actual
   * @returns {Promise<string>} Promesa que resuelve a un string con el nombre del usuario
   * @private
   */
  private async getSessionUserName(): Promise<string> {
    const responseUser: SessionResponse = await HttpService.get('/auth/session')
    let userName: string = ''

    if (
      responseUser.status === 200 &&
      responseUser.data.person.personFirstname
    ) {
      userName = responseUser.data.person.personFirstname
    }

    return userName
  }

  /**
   * Valida las credenciales de inicio de sesión del usuario
   * @param {string} email - Correo electrónico del usuario a validar
   * @param {string} password - Contraseña del usuario a validar
   * @throws {RequiredFieldException} si algún campo está vacío
   * @throws {InvalidFieldFormatException} si algún campo tiene formato inválido
   * @private
   */
  private validateCredentials(email: string, password: string): void {
    this.validateEmail(email)
    this.validatePassword(password)
  }

  /**
   * Valida el formato del correo electrónico y verifica posibles patrones de inyección SQL
   * @param {string} email - Correo electrónico a validar
   * @throws {RequiredFieldException} si el correo está vacío
   * @throws {InvalidFieldFormatException} si el correo tiene formato inválido o contiene patrones de inyección SQL
   * @private
   */
  private validateEmail(email: string): void {
    if (!email) {
      throw new RequiredFieldException(
        i18next.t('screens.authentication.email')
      )
    }

    const emailFormatPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailFormatPattern.test(email)) {
      throw new InvalidFieldFormatException(
        i18next.t('screens.authentication.email')
      )
    }

    const emailSqlInjectionPattern = /['"]/

    if (emailSqlInjectionPattern.test(email)) {
      throw new InvalidFieldFormatException(
        i18next.t('screens.authentication.email')
      )
    }
  }

  /**
   * Valida una contraseña contra varios patrones de inyección SQL
   * @param {string} password - Contraseña a validar
   * @throws {RequiredFieldException} si la contraseña está vacía
   * @throws {InvalidFieldFormatException} si la contraseña contiene patrones de inyección SQL
   * @private
   */
  private validatePassword(password: string): void {
    if (!password) {
      throw new RequiredFieldException(
        i18next.t('screens.authentication.password')
      )
    }

    const sqlInjectionPatterns = [
      /\bOR\b\s+['"]?\s*\d+\s*=\s*\d+\s*['"]?/i, // OR 1=1
      /\bAND\b\s+['"]?\s*\d+\s*=\s*\d+\s*['"]?/i, // AND 1=1
      /\bUNION\b\s+\bSELECT\b/i, // UNION SELECT
      /--/, // Comentarios SQL
      /\/\*/, // Comentarios multilínea
      /\s*DROP\s+TABLE/i, // DROP TABLE
      /\s*DELETE\s+FROM/i, // DELETE FROM
      /\s*INSERT\s+INTO/i, // INSERT INTO
      /\s*UPDATE\s+/i, // UPDATE
      /EXEC\s+(\w+)sp_/i, // Stored procedures
      /xp_cmdshell/i, // xp_cmdshell
      /'\s*OR\s*'1'='1/i, // ' OR '1'='1
      /'\s*OR\s*1=1\s*--/i, // ' OR 1=1 --
      /'\s*OR\s*1=1#/i, // ' OR 1=1#
      /'\s*OR\s*1=1\/\*/i, // ' OR 1=1/*
      /'\s*OR\s*''\s*=\s*'/i, // ' OR '' = '
      /'\s*OR\s*''\s*=\s*''\s*--/i, // ' OR '' = '' --
      /'\s*OR\s*""=""/i, // ' OR ""=""
      /'\s*OR\s*TRUE--/i, // ' OR TRUE--
      /'\s*OR\s*'1'='1'\s*--/i, // ' OR '1'='1' --
      /'\s*OR\s*'1'='1'\s*#/i, // ' OR '1'='1' #
      /'\s*OR\s*'1'='1'\/\*/i, // ' OR '1'='1'/*
      /admin'\s*--/i, // admin' --
      /'\s*OR\s*EXISTS\s*\(\s*SELECT/i, // ' OR EXISTS(SELECT * FROM users) --
      /'\s*OR\s*\(\s*SELECT\s*COUNT/i, // ' OR (SELECT COUNT(*) FROM users) > 0 --
      /'\s*OR\s*\(\s*SELECT\s*\w+\s*FROM/i, // ' OR (SELECT username FROM users LIMIT 1) = 'admin
      /'\s*AND\s*1=1\s*--/i, // ' AND 1=1 --
      /'\s*AND\s*1=2\s*--/i, // ' AND 1=2 --
      /'\s*AND\s*substring\s*\(\s*@@version/i, // ' AND substring(@@version,1,1) = '5
      /'\s*AND\s*ascii\s*\(\s*substring/i, // ' AND ascii(substring((SELECT password FROM users LIMIT 1),1,1)) > 64 --
      /'\s*OR\s*IF\s*\(\s*.*SLEEP/i, // ' OR IF(1=1, SLEEP(5), 0) --
      /'\s*OR\s*.*SLEEP\s*\(/i, // ' OR 1=1 AND SLEEP(3) --
      /'\s*OR\s*'a'='a/i, // ' OR 'a'='a
      /password'\s*OR\s*'1'='1/i, // password' OR '1'='1
      /'\s*OR\s*1=1\s*LIMIT\s*1/i, // ' OR 1=1 LIMIT 1 --
      /'\s*OR\s*''\s*=\s*''\s*OR\s*''\s*=\s*'/i, // ' OR '' = '' OR '' = '
      /'\s*OR\s*'1'\s*=\s*'1'\s*\/\*'/i // ' OR '1' = '1' /*'
    ]

    for (const pattern of sqlInjectionPatterns) {
      if (pattern.test(password)) {
        throw new InvalidFieldFormatException(
          i18next.t('screens.authentication.password')
        )
      }
    }
  }
}
