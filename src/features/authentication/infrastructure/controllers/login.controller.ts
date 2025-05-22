import { LoginAuthenticationUsecase } from '../../application/login-authentication/login-authentication.usecase'
import { ILoginAuthenticationDTO } from '../../application/login-authentication/login-authentication.dto'
import { AuthenticationEntity } from '../../domain/entities/authentication-entity'
import i18next from 'i18next'
import { LoginRepositoryFactory } from '../factories/login-repository.factory'

/**
 * Controlador para la autenticación de usuarios
 * @class LoginController
 */
export class LoginController {
  private loginAuthentication!: LoginAuthenticationUsecase

  /**
   * Procesa la solicitud de inicio de sesión de un usuario.
   * <br />
   * - Inicia sesión y almacena las credenciales del usuario en el almacenamiento local si la autenticación es exitosa.
   * @param {ILoginAuthenticationDTO} loginAuthenticationDTO - Objeto con las credenciales (email y password) del usuario
   * @returns {Promise<AuthenticationEntity>} Promesa que resuelve a un objeto Authentication con los datos de la sesión
   * @throws { Error } si hay problemas de conexión con la API
   */
  async login(
    loginAuthenticationDTO: ILoginAuthenticationDTO
  ): Promise<AuthenticationEntity> {
    const loginRepository = new LoginRepositoryFactory().repository(
      loginAuthenticationDTO.type
    )

    this.loginAuthentication = new LoginAuthenticationUsecase(loginRepository)

    const authentication = new AuthenticationEntity({
      loginCredentials: {
        email: loginAuthenticationDTO.email,
        password: loginAuthenticationDTO.password
      },
      createdAt: new Date()
    })

    const authenticationResult =
      await this.loginAuthentication.run(authentication)

    const isAuthenticated = authenticationResult?.props?.authState?.isAuthenticated as boolean

    if (!isAuthenticated) {
      throw new Error(i18next.t('errors.loginFailed'))
    }

    return authenticationResult
  }
}
