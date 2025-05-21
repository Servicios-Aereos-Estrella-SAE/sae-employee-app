import { IAuthState } from './auth-state.interface'
import { ILoginCredentials } from './login-credentials.interface'

/**
 * Interfaz que define la estructura de autenticación
 * @interface IAuthentication
 */
export interface IAuthentication {
  /**
   * Estado de autenticación del usuario
   * @type {IAuthState | undefined}
   */
  readonly authState?: IAuthState

  /**
   * Credenciales de inicio de sesión
   * @type {ILoginCredentials | undefined}
   */
  readonly loginCredentials?: ILoginCredentials

  /**
   * Nombre del usuario autenticado
   * @type {string | null | undefined}
   */
  readonly userName?: string | null
}
