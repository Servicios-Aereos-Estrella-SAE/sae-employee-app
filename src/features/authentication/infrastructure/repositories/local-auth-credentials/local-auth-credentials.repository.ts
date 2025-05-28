 
import { AuthenticationLocalStorageService } from '../../services/authentication-local-storage.service'
import { AuthenticationEntity } from '../../../domain/entities/authentication-entity.js'
import { AuthenticationPorts } from '../../../domain/ports/authentication.ports.js'

/**
 * Repositorio que implementa la comunicación con el almacenamiento local para obtener las credenciales de autenticación del usuario
 * @class LocalAuthStateRepository
 */
export class LocalAuthCredentialsRepository implements Pick<AuthenticationPorts, 'getAuthCredentials'>
{
  /**
   * Obtiene las credenciales de autenticación del usuario desde el almacenamiento local en el dispositivo
   * @returns {Promise<AuthenticationEntity | null>} Credenciales de autenticación del usuario o null si no existe
   */
  async getAuthCredentials(): Promise<AuthenticationEntity | null> {
    const authenticationLocalStorageService = new AuthenticationLocalStorageService()
    const credentials = await authenticationLocalStorageService.localGetAuthenticationCredentials()
    return credentials
  }
}
