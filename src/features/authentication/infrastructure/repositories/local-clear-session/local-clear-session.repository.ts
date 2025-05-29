import { AuthenticationPorts } from '../../../domain/ports/authentication.ports'
import { AuthenticationLocalStorageService } from '../../services/authentication-local-storage.service'

/**
 * Repositorio que implementa la comunicación con el almacenamiento local para eliminar la sesión del usuario
 * @class LocalClearSessionRepository
 */
export class LocalClearSessionRepository implements Pick<AuthenticationPorts, 'clearSession'> {
  /**
   * Elimina la sesión del usuario desde el almacenamiento local en el dispositivo
   * @returns {Promise<void>} Promesa que resuelve cuando la sesión se ha eliminado
   */
  async clearSession(): Promise<void> {
    const authenticationLocalStorageService = new AuthenticationLocalStorageService()
    await authenticationLocalStorageService.localClearAuthenticationState()
  }
}
