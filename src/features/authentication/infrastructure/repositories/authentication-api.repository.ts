// import { API_URL } from '@env'
// import axios from 'axios';
// import { UserEntity } from '../../../user/domain/entities/user.entity'
// import { AuthenticationEntity } from '../../domain/entities/authentication.entity'
// import { AuthenticationPorts } from '../../domain/ports/authentication.ports'
// import { RequiredFieldException } from '../../../../core/domain/exceptions/required-field.exception';
// import { InvalidFieldFormatException } from '../../../../core/domain/exceptions/invalid-field-format.exception';
// import { RequiredAllFieldsException } from '../../../../core/domain/exceptions/required-all-fields.exception';

// /**
//  * Repositorio que implementa la comunicación con la API para procesos de autenticación
//  * @class AuthenticationAPIRepository
//  * @implements {AuthenticationPorts}
//  */
// export class AuthenticationAPIRepository implements AuthenticationPorts {
//   // private authStorage: UserStorage
//   // private biometricsService: BiometricsService

//   /**
//    * Constructor del repositorio de autenticación
//    */
//   constructor() {
//     // this.authStorage = new UserStorage()
//     // this.biometricsService = new BiometricsService()
//   }

//   /**
//    * Realiza el proceso de autenticación del usuario contra la API
//    * @param {AuthenticationEntity} authentication: Authentication - Objeto Authentication con las credenciales de inicio de sesión
//    * @returns {Promise<AuthenticationEntity>} Promesa que resuelve a un objeto Authentication con los datos del usuario y token de sesión
//    * @throws { RequiredAllFieldsException } si no se proporcionan las credenciales
//    * @throws { RequiredFieldException } si algún campo de las credenciales está vacío
//    * @throws { InvalidFieldFormatException } si algún campo de las credenciales tiene formato inválido
//    * @throws { Error } si hay problemas de conexión con la API
//    */
//   async login(authentication: AuthenticationEntity): Promise<AuthenticationEntity> {
//     try {
//       if (!authentication.props.loginCredentials) {
//         throw new RequiredAllFieldsException()
//       }

//       this.validateCredentials(authentication.props.loginCredentials.email, authentication.props.loginCredentials.password)

//       const apiClient = axios.create({
//         baseURL: `${API_URL}`,
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//         },
//       })

//       const response = await apiClient.post('/auth/login', {
//         userEmail: authentication.props.loginCredentials.email,
//         userPassword: authentication.props.loginCredentials.password
//       })

//       if (response.status !== 200) {
//         throw new Error(response.data.message)
//       }

//       const responseData = response.data.data

//       const apiClient2 = axios.create({
//         baseURL: `${API_URL}`,
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//           'Authorization': `Bearer ${responseData.token}`
//         },
//       })

//       const responseUser = await apiClient2.get('/auth/session')
//       let userName = null

//       if (responseUser.status === 200 && responseUser.data.person.personFirstname) {
//         userName = responseUser.data.person.personFirstname
//       }

//       const user = {
//         id: responseData.user.userId,
//         email: responseData.user.userEmail,
//         password: responseData.user.userPassword,
//         token: responseData.token,
//         pinCode: responseData.user.userPinCode,
//         active: responseData.user.userActive,
//         personId: responseData.user.personId,
//         roleId: responseData.user.roleId,
//         pinCodeExpiresAt: responseData.user.pinCodeExpiresAt,
//         businessAccess: responseData.user.businessAccess,
//         createdAt: responseData.user.createdAt,
//         updatedAt: responseData.user.updatedAt,
//         deletedAt: responseData.user.deletedAt,
//       }

//       const newAuthentication = new AuthenticationEntity({
//         authState: {
//           user: user,
//           token: responseData.token,
//           isAuthenticated: true,
//         },
//         userName: userName,
//         loginCredentials: authentication.props.loginCredentials
//       })

//       return newAuthentication
//     } catch (error) {
//       if (axios.isAxiosError(error) && error.response) {
//         throw new Error(error.response.data.message || 'Error al iniciar sesión')
//       }
//       throw new Error(error instanceof Error ? error.message : 'Error de conexión. Intenta nuevamente.')
//     }
//   }

//   /**
//    * Guarda las credenciales de inicio de sesión de forma segura
//    * @param {AuthenticationEntity} authenticationEntity - Objeto Authentication con las credenciales de inicio de sesión
//    * @returns {Promise<void>}
//    */
//   async storeCredentials(authenticationEntity: AuthenticationEntity): Promise<void> {
//     // await this.authStorage.saveCredentials(email, password)
//   }

//   /**
//    * Guarda el estado de autenticación en el almacenamiento local
//    * @param {string} token - Token de autenticación a guardar
//    * @param {UserEntity} user - Datos del usuario a guardar
//    * @returns {Promise<void>}
//    */
//   async saveAuthState(token: string, user: UserEntity): Promise<void> {
//     // await this.authStorage.saveToken(token)
//     // await this.authStorage.saveUser(user)
//   }

//   /**
//    * Obtiene el estado de autenticación desde el almacenamiento local
//    * @returns {Promise<{ token: string | null; user: UserEntity | null }>} Datos de autenticación almacenados
//    */
//   async getAuthState(): Promise<{ token: string | null; user: UserEntity | null }> {
//     // const token = await this.authStorage.getToken()
//     // const user = await this.authStorage.getUser()
//     // return { token, user }
//     return { token: null, user: null }
//   }

//   /**
//    * Elimina el estado de autenticación del almacenamiento local
//    * @returns {Promise<void>}
//    */
//   async clearAuthState(): Promise<void> {
//     // await this.authStorage.clearAuth()
//   }

//   /**
//    * Elimina todo el estado de autenticación incluyendo credenciales guardadas
//    * @returns {Promise<void>}
//    */
//   async clearFullAuthState(): Promise<void> {
//     // await this.authStorage.clearAll()
//   }

//   /**
//    * Verifica si la autenticación biométrica está disponible en el dispositivo
//    * @returns {Promise<boolean>} true si la autenticación biométrica está disponible
//    */
//   async isBiometricAvailable(): Promise<boolean> {
//     return false
//     // return this.biometricsService.isBiometricAvailable()
//   }

//   /**
//    * Realiza la autenticación mediante biometría y inicia sesión automáticamente si hay credenciales guardadas
//    * @returns {Promise<boolean>} true si la autenticación biométrica y el inicio de sesión fueron exitosos
//    */
//   async authenticateWithBiometrics(): Promise<boolean> {
//     return false
//     // const isAuthenticated = await this.biometricsService.authenticate()

//     // if (isAuthenticated) {
//     //   const credentials = await this.authStorage.getCredentials()

//     //   if (credentials) {
//     //     try {
//     //       const { user, token } = await this.authApi.login(credentials)
//     //       await this.saveAuthState(token, user)
//     //       return true
//     //     } catch (error) {
//     //       console.error('Error al iniciar sesión con credenciales guardadas:', error)
//     //       return false
//     //     }
//     //   }
//     // }

//     // return false
//   }

//   /**
//    * Valida las credenciales de inicio de sesión del usuario
//    * @param {string} email - Correo electrónico del usuario a validar
//    * @param {string} password - Contraseña del usuario a validar
//    * @throws {RequiredFieldException} si algún campo está vacío
//    * @throws {InvalidFieldFormatException} si algún campo tiene formato inválido
//    * @private
//    */
//   private validateCredentials(email: string, password: string): void {
//     this.validateEmail(email)
//     this.validatePassword(password)
//   }

//   /**
//    * Valida el formato del correo electrónico y verifica posibles patrones de inyección SQL
//    * @param {string} email - Correo electrónico a validar
//    * @throws {RequiredFieldException} si el correo está vacío
//    * @throws {InvalidFieldFormatException} si el correo tiene formato inválido o contiene patrones de inyección SQL
//    * @private
//    */
//   private validateEmail(email: string): void {
//     if (!email) {
//       throw new RequiredFieldException('correo electrónico')
//     }

//     const emailFormatPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

//     if (!emailFormatPattern.test(email)) {
//       throw new InvalidFieldFormatException('correo electrónico')
//     }

//     const emailSqlInjectionPattern = /['"]/

//     if (emailSqlInjectionPattern.test(email)) {
//       throw new InvalidFieldFormatException('correo electrónico')
//     }
//   }

//   /**
//    * Valida una contraseña contra varios patrones de inyección SQL
//    * @param {string} password - Contraseña a validar
//    * @throws {RequiredFieldException} si la contraseña está vacía
//    * @throws {InvalidFieldFormatException} si la contraseña contiene patrones de inyección SQL
//    * @private
//    */
//   private validatePassword(password: string): void {
//     if (!password) {
//       throw new RequiredFieldException('contraseña')
//     }

//     const sqlInjectionPatterns = [
//       /\bOR\b\s+['"]?\s*\d+\s*=\s*\d+\s*['"]?/i,        // OR 1=1
//       /\bAND\b\s+['"]?\s*\d+\s*=\s*\d+\s*['"]?/i,       // AND 1=1
//       /\bUNION\b\s+\bSELECT\b/i,                        // UNION SELECT
//       /--/,                                             // Comentarios SQL
//       /\/\*/,                                           // Comentarios multilínea
//       /\s*DROP\s+TABLE/i,                              // DROP TABLE
//       /\s*DELETE\s+FROM/i,                             // DELETE FROM
//       /\s*INSERT\s+INTO/i,                             // INSERT INTO
//       /\s*UPDATE\s+/i,                                 // UPDATE
//       /EXEC\s+(\w+)sp_/i,                               // Stored procedures
//       /xp_cmdshell/i,                                   // xp_cmdshell
//       /'\s*OR\s*'1'='1/i,                               // ' OR '1'='1
//       /'\s*OR\s*1=1\s*--/i,                             // ' OR 1=1 --
//       /'\s*OR\s*1=1#/i,                                 // ' OR 1=1#
//       /'\s*OR\s*1=1\/\*/i,                              // ' OR 1=1/*
//       /'\s*OR\s*''\s*=\s*'/i,                           // ' OR '' = '
//       /'\s*OR\s*''\s*=\s*''\s*--/i,                     // ' OR '' = '' --
//       /'\s*OR\s*""=""/i,                                // ' OR ""=""
//       /'\s*OR\s*TRUE--/i,                               // ' OR TRUE--
//       /'\s*OR\s*'1'='1'\s*--/i,                         // ' OR '1'='1' --
//       /'\s*OR\s*'1'='1'\s*#/i,                          // ' OR '1'='1' #
//       /'\s*OR\s*'1'='1'\/\*/i,                          // ' OR '1'='1'/*
//       /admin'\s*--/i,                                   // admin' --
//       /'\s*OR\s*EXISTS\s*\(\s*SELECT/i,                 // ' OR EXISTS(SELECT * FROM users) --
//       /'\s*OR\s*\(\s*SELECT\s*COUNT/i,                  // ' OR (SELECT COUNT(*) FROM users) > 0 --
//       /'\s*OR\s*\(\s*SELECT\s*\w+\s*FROM/i,             // ' OR (SELECT username FROM users LIMIT 1) = 'admin
//       /'\s*AND\s*1=1\s*--/i,                            // ' AND 1=1 --
//       /'\s*AND\s*1=2\s*--/i,                            // ' AND 1=2 --
//       /'\s*AND\s*substring\s*\(\s*@@version/i,          // ' AND substring(@@version,1,1) = '5
//       /'\s*AND\s*ascii\s*\(\s*substring/i,              // ' AND ascii(substring((SELECT password FROM users LIMIT 1),1,1)) > 64 --
//       /'\s*OR\s*IF\s*\(\s*.*SLEEP/i,                    // ' OR IF(1=1, SLEEP(5), 0) --
//       /'\s*OR\s*.*SLEEP\s*\(/i,                         // ' OR 1=1 AND SLEEP(3) --
//       /'\s*OR\s*'a'='a/i,                               // ' OR 'a'='a
//       /password'\s*OR\s*'1'='1/i,                       // password' OR '1'='1
//       /'\s*OR\s*1=1\s*LIMIT\s*1/i,                      // ' OR 1=1 LIMIT 1 --
//       /'\s*OR\s*''\s*=\s*''\s*OR\s*''\s*=\s*'/i,        // ' OR '' = '' OR '' = '
//       /'\s*OR\s*'1'\s*=\s*'1'\s*\/\*'/i                 // ' OR '1' = '1' /*'
//     ]

//     for (const pattern of sqlInjectionPatterns) {
//       if (pattern.test(password)) {
//         throw new InvalidFieldFormatException('contraseña')
//       }
//     }
//   }
// }
