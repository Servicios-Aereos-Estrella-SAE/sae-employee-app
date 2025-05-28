import { GetAuthStateUsecase } from '../../application/get-auth-state/get-auth-state.usecase'
import { LocalAuthCredentialsRepository } from '../repositories/local-auth-credentials.repository/local-auth-credentials.repository'
import { AuthenticationEntity } from '../../domain/entities/authentication-entity'

/**
 * Controlador para obtener el estado de autenticación del usuario
 * @class AuthStateController
 */
export class AuthCredentialsController {
  private readonly repository: LocalAuthCredentialsRepository
  private readonly usecase: GetAuthStateUsecase

  /**
   * Constructor del controlador de autenticación
   */
  constructor() {
    this.repository = new LocalAuthCredentialsRepository()
    this.usecase = new GetAuthStateUsecase(this.repository)
  }

  /**
   * Obtiene el estado de autenticación del usuario
   * @returns {Promise<AuthenticationEntity | null>} Promesa que resuelve a la entidad de autenticación con los datos de sesión o null si no existe
   */
  async getAuthCredentials(): Promise<AuthenticationEntity | null> {
    return await this.usecase.run()
  }
}
