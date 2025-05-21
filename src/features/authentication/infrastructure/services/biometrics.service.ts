import * as LocalAuthentication from 'expo-local-authentication'
import i18next from 'i18next'

/**
 * Servicio para gestionar la autenticación biométrica
 * @class BiometricsService
 */
export class BiometricsService {
  /**
   * Verifica si la autenticación biométrica está disponible en el dispositivo
   * @returns {Promise<boolean>} Promesa que resuelve a true si la autenticación biométrica está disponible
   */
  async isBiometricAvailable(): Promise<boolean> {
    const compatible = await LocalAuthentication.hasHardwareAsync()
    const enrolled = await LocalAuthentication.isEnrolledAsync()
    return compatible && enrolled
  }

  /**
   * Realiza la autenticación biométrica
   * - Muestra un mensaje de autenticación biométrica
   * - Muestra un mensaje de error en caso de que la autenticación biométrica falle
   * @returns {Promise<boolean>} Promesa que resuelve a true si la autenticación fue exitosa
   */
  async authenticate(): Promise<boolean> {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: i18next.t(
          'common.authentication.biometricPromptMessage'
        ),
        fallbackLabel: i18next.t('common.authentication.biometricFallbackLabel')
      })

      return result.success
    } catch (error) {
      console.error(error)
      throw new Error(i18next.t('errors.biometricAuthenticationError'))
    }
  }
}
