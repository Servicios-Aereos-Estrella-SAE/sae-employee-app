import { AuthenticationPorts } from '../../domain/ports/authentication.ports'

/**
 * Caso de uso para eliminar la sesión del usuario
 * @class ClearSessionUsecase
 */
export class ClearSessionUsecase {
  /**
   * Constructor del caso de uso para eliminar la sesión del usuario
   * @param {Pick<AuthenticationPorts, 'clearSession'>} authenticationPorts - Puerto definido para la autenticación
   */
  constructor(
    private readonly authenticationPorts: Pick<AuthenticationPorts, 'clearSession'>
  ) {}

  /**
   * Ejecuta el caso de uso para eliminar la sesión del usuario
   * @returns {Promise<void>} Promesa que resuelve cuando la sesión se ha eliminado
   */
  async run(): Promise<void> {
    await this.authenticationPorts.clearSession()
  }
}
