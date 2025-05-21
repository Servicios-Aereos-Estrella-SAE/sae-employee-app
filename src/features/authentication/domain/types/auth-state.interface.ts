import { IUser } from '../../../user/domain/types/user.interface'

/**
 * Interfaz que define el estado de autenticación
 * @interface IAuthState
 */
export interface IAuthState {
  /**
   * Información del usuario autenticado
   * @type {IUser | undefined}
   */
  readonly user?: IUser

  /**
   * Token de autenticación
   * @type {string}
   */
  readonly token: string

  /**
   * Indica si el usuario está autenticado
   * @type {boolean}
   */
  readonly isAuthenticated: boolean

  /**
   * Indica si hay una operación de autenticación en curso
   * @type {boolean | undefined}
   */
  readonly loading?: boolean

  /**
   * Mensaje de error en caso de fallo en la autenticación
   * @type {string | undefined}
   */
  readonly error?: string
}
