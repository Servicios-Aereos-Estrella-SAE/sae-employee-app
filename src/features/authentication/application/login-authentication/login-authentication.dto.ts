import { ELoginTypes } from '../types/login-types.enum'

/**
 * Interfaz que define el formato de datos para la solicitud de autenticación
 * @interface ILoginAuthenticationDTO
 */
export interface ILoginAuthenticationDTO {
  /**
   * Correo electrónico del usuario
   * @type {string}
   */
  readonly email: string

  /**
   * Contraseña del usuario
   * @type {string}
   */
  readonly password: string

  /**
   * Tipo de autenticación
   * - 'email' para autenticación con correo electrónico y contraseña
   * - 'biometric' para autenticación con biometría
   * @type {ELoginTypes}
   */
  readonly type: ELoginTypes
}
