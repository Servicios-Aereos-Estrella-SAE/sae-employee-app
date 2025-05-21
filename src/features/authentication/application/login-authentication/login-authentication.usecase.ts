import { AuthenticationEntity } from '../../domain/entities/authenticationEntity.js'
import { AuthenticationPorts } from '../../domain/ports/authentication.ports.js'

/**
 * Caso de uso para realizar la autenticación de un usuario
 * <br />
 * - Inicia sesión y almacena las credenciales del usuario en el almacenamiento local si la autenticación es exitosa.
 * @class LoginAuthentication
 */
export class LoginAuthenticationUsecase {
  /**
   * Constructor del caso de uso de autenticación
   * @param {Pick<AuthenticationPorts, 'login'>} authenticationPorts - Puerto definido para la autenticación
   */
  constructor(
    private readonly authenticationPorts: Pick<AuthenticationPorts, 'login'>
  ) {}

  /**
   * Ejecuta el proceso de autenticación
   * <br />
   * - Inicia sesión y almacena las credenciales del usuario en el almacenamiento local si la autenticación es exitosa.
   * @param {AuthenticationEntity} authenticationEntity - Entidad con las credenciales de autenticación
   * @returns {Promise<AuthenticationEntity>} Promesa que resuelve a la entidad de autenticación con los datos de sesión
   */
  async run(
    authenticationEntity: AuthenticationEntity
  ): Promise<AuthenticationEntity> {
    return this.authenticationPorts.login(authenticationEntity)
  }
}
