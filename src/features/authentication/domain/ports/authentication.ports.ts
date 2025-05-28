import { AuthenticationEntity } from '../entities/authentication-entity'

/**
 * Interfaz que define los puertos de autenticación para la comunicación con servicios externos
 * @interface AuthenticationPorts
 */
export interface AuthenticationPorts {
  /**
   * Realiza el proceso de autenticación del usuario.
   * <br />
   * - Inicia sesión y almacena las credenciales del usuario en el almacenamiento local si la autenticación es exitosa.
   * @param {AuthenticationEntity} authenticationEntity - Entidad con las credenciales de autenticación
   * @returns {Promise<AuthenticationEntity>} Promesa que resuelve a la entidad de autenticación con los datos de sesión
   */
  login(
    authenticationEntity: AuthenticationEntity
  ): Promise<AuthenticationEntity>

  // /**
  //  * Guarda las credenciales del usuario en el almacenamiento local para futuras autenticaciones,
  //  * preferiblemente con la biometría del dispositivo cuando esté disponible.
  //  * @param {AuthenticationEntity} authenticationEntity - Entidad con las credenciales de autenticación
  //  * @returns {Promise<void>} Promesa que resuelve a la entidad de autenticación con los datos de sesión
  //  */
  // storeAuthState(authenticationEntity: AuthenticationEntity): Promise<void>

  /**
   * Obtiene las credenciales de autenticación del usuario
   * @returns {Promise<AuthenticationEntity | null>} Promesa que resuelve a la entidad de autenticación con los datos de sesión o null si no existe
   */
  getAuthCredentials(): Promise<AuthenticationEntity | null>

  // saveAuthState(token: string, user: User): Promise<void>;
  // getAuthState(): Promise<{ token: string | null; user: User | null }>;
  // clearAuthState(): Promise<void>;
  // clearFullAuthState(): Promise<void>;
  // isBiometricAvailable(): Promise<boolean>;
  // authenticateWithBiometrics(): Promise<boolean>;
}
