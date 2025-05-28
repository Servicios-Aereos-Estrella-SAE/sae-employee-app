import { GetAuthCredentialsUsecase } from '../../application/get-auth-credentials/get-auth-credentials.usecase'
import { LocalAuthCredentialsRepository } from '../repositories/local-auth-credentials/local-auth-credentials.repository'
import { AuthenticationEntity } from '../../domain/entities/authentication-entity'

/**
 * Controlador para obtener el estado de autenticación del usuario
 * @class AuthStateController
 */
export class AuthCredentialsController {
  private readonly repository: LocalAuthCredentialsRepository
  private readonly usecase: GetAuthCredentialsUsecase

  /**
   * Constructor del controlador de autenticación
   */
  constructor() {
    this.repository = new LocalAuthCredentialsRepository()
    this.usecase = new GetAuthCredentialsUsecase(this.repository)
  }

  /**
   * Obtiene el estado de autenticación del usuario
   * @returns {Promise<AuthenticationEntity | null>} Promesa que resuelve a la entidad de autenticación con los datos de sesión o null si no existe
   */
  async getAuthCredentials(): Promise<AuthenticationEntity | null> {
    return await this.usecase.run()
  }
}
