import { Alert } from 'react-native'
import i18next from 'i18next'
import { LoginController } from '../controllers/login.controller'
import { ELoginTypes } from '../../application/types/login-types.enum'
import { AuthStateController } from '../controllers/auth-state.controller'

/**
 * Interfaz para el resultado de la autenticación por contraseña
 * @interface IPasswordAuthResult
 */
export interface IPasswordAuthResult {
  /**
   * Indica si la autenticación fue exitosa
   * @type {boolean}
   */
  success: boolean

  /**
   * Mensaje de error en caso de que la autenticación falle
   * @type {string | undefined}
   */
  error?: string
}

/**
 * Servicio para gestionar la autenticación por contraseña mediante prompts
 * @class PasswordPromptService
 */
export class PasswordPromptService {
  /**
   * Muestra un prompt para solicitar la contraseña del usuario y valida las credenciales
   * @returns {Promise<IPasswordAuthResult>} Promesa que resuelve con el resultado de la autenticación
   */
  async authenticateWithPassword(): Promise<IPasswordAuthResult> {
    return new Promise((resolve) => {
      Alert.prompt(
        i18next.t('common.authentication.passwordPromptTitle'),
        i18next.t('common.authentication.passwordPromptMessage'),
        [
          {
            text: i18next.t('common.cancel'),
            onPress: (): void => resolve({ success: false, error: 'User cancelled' }),
            style: 'cancel'
          },
          {
            text: i18next.t('common.ok'),
            onPress: async (password): Promise<void> => {
              if (!password) {
                resolve({ 
                  success: false, 
                  error: i18next.t('errors.passwordRequired') 
                })
                return
              }

              try {
                await this.validatePassword(password)
                resolve({ success: true })
              } catch (error) {
                resolve({ 
                  success: false, 
                  error: error instanceof Error ? error.message : i18next.t('errors.invalidPassword')
                })
              }
            }
          }
        ],
        'secure-text'
      )
    })
  }

  /**
   * Valida la contraseña ingresada contra las credenciales almacenadas
   * @param {string} password - Contraseña a validar
   * @returns {Promise<void>} Promesa que resuelve si la contraseña es válida
   * @throws {Error} Si la contraseña es inválida o hay problemas de autenticación
   * @private
   */
  private async validatePassword(password: string): Promise<void> {
    try {
      // Obtener las credenciales almacenadas del usuario actual
      const authStateController = new AuthStateController()
      const authState = await authStateController.getAuthState()

      if (!authState?.props.loginCredentials?.email) {
        throw new Error(i18next.t('errors.noStoredCredentials'))
      }

      // Intentar autenticar con las credenciales proporcionadas
      const loginController = new LoginController()
      await loginController.login({
        email: authState.props.loginCredentials.email,
        password: password,
        type: ELoginTypes.EMAIL
      })

      // Si llegamos aquí, la autenticación fue exitosa
      return Promise.resolve()
    } catch {
      // Si hay un error de autenticación, la contraseña es incorrecta
      throw new Error(i18next.t('errors.invalidPassword'))
    }
  }
}
