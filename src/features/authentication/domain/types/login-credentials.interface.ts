/**
 * Interfaz que define las credenciales de inicio de sesión
 * @interface ILoginCredentials
 */
export interface ILoginCredentials {
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
}
