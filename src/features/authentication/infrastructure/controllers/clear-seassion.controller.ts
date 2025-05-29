import { ClearSessionUsecase } from '../../application/clear-session/clear-session.usecase'
import { LocalClearSessionRepository } from '../repositories/local-clear-session/local-clear-session.repository'

/**
 * Controlador para eliminar la sesión del usuario
 * @class ClearSessionController
 */
export class ClearSessionController {
  private readonly clearSessionUsecase: ClearSessionUsecase

  /**
   * Constructor del controlador para eliminar la sesión del usuario
   */
  constructor() {
    const repository = new LocalClearSessionRepository()
    this.clearSessionUsecase = new ClearSessionUsecase(repository)
  }

  /**
   * Elimina la sesión del usuario
   * @returns {Promise<void>} Promesa que resuelve cuando la sesión se ha eliminado
   */
  async clearSession(): Promise<void> {
    await this.clearSessionUsecase.run()
  }
}
