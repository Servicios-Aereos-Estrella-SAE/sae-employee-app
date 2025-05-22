 
import { AuthenticationLocalStorageService } from '../../services/authentication-local-storage.service'
import { AuthenticationEntity } from '../../../domain/entities/authentication-entity.js'
import { AuthenticationPorts } from '../../../domain/ports/authentication.ports.js'

/**
 * Obtener el estado de autenticación del usuario desde el almacenamiento local en el dispositivo
 * @class LocalAuthStateRepository
 * @implements {Pick<AuthenticationPorts, 'getAuthState'>}
 */
export class LocalAuthStateRepository implements Pick<AuthenticationPorts, 'getAuthState'>
{
  /**
   * Obtener el estado de autenticación del usuario desde el almacenamiento local en el dispositivo
   * @returns {Promise<AuthenticationEntity | null>} Promesa que resuelve a la entidad de autenticación con los datos de sesión o null si no existe
   */
  async getAuthState(): Promise<AuthenticationEntity | null> {
    const authenticationLocalStorageService =
      new AuthenticationLocalStorageService()
    const state =
      await authenticationLocalStorageService.localGetAuthenticationState()
    return state
  }
}
