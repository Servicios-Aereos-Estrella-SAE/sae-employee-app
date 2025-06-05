import { useState } from 'react'
import { Alert, Linking, Platform } from 'react-native'
import { DateTime } from 'luxon'
import { useTranslation } from 'react-i18next'
import { useAppTheme } from '../../theme/theme-context'
import { LocationService, ILocationCoordinates } from '../../../src/features/authentication/infrastructure/services/location.service'
import { BiometricsService } from '../../../src/features/authentication/infrastructure/services/biometrics.service'
import { PasswordPromptService } from '../../../src/features/authentication/infrastructure/services/password-prompt.service'
import { AuthStateController } from '../../../src/features/authentication/infrastructure/controllers/auth-state.controller'

/**
 * Controlador para la pantalla de registro de asistencia
 * @returns {Object} Objeto con los datos y funciones accesibles desde la pantalla de registro de asistencia
 */
const AttendanceCheckScreenController = () => {
  const [isButtonLocked, setIsButtonLocked] = useState(false)
  const [checkInTime, setCheckInTime] = useState<string | null>(null)
  const [currentLocation, setCurrentLocation] = useState<ILocationCoordinates | null>(null)
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const { themeType } = useAppTheme()
  const { t } = useTranslation()

  /**
   * Maneja el evento de registro de asistencia
   * - Valida ubicación precisa antes de permitir el check-in
   * - Obtiene coordenadas y las muestra en pantalla
   * @returns {Promise<void>}
   */
  const handleCheckIn = async () => {
    if (isButtonLocked || isLoadingLocation) return

    setIsLoadingLocation(true)

    try {
      // Validar ubicación precisa antes del check-in
      const locationService = new LocationService()
      
      try {
        const coordinates = await locationService.getValidatedLocation(30) // Precisión de 30 metros - recomendado para asistencia laboral
        setCurrentLocation(coordinates)
        
        // Proceder con el check-in solo si la ubicación es válida
        await performCheckIn()
      } catch (locationError) {
        const errorMessage = locationError instanceof Error ? locationError.message : ''
        
        // Verificar si el error es de precisión o autorización
        const isPrecisionError = errorMessage.includes('precisión') || errorMessage.includes('precision') || errorMessage.includes('accuracy')
        const isPermissionError = errorMessage.includes('permission') || errorMessage.includes('autorización') || errorMessage.includes('denied')
        
        if (isPrecisionError || isPermissionError) {
          Alert.alert(
            t('common.error'),
            `${errorMessage}\n\n${t('errors.goToSettingsMessage')}`,
            [
              {
                text: t('common.cancel'),
                style: 'cancel'
              },
              {
                text: t('common.settings'),
                onPress: () => {
                  void openLocationSettings()
                }
              }
            ]
          )
        } else {
          Alert.alert(
            t('common.error'),
            errorMessage || t('errors.locationRequired')
          )
        }
        return
      }
    } catch (error) {
      console.error('Error en check-in:', error)
      Alert.alert(
        t('common.error'),
        t('errors.unknownError')
      )
    } finally {
      setIsLoadingLocation(false)
    }
  }

  /**
   * Ejecuta el proceso de check-in después de validar la ubicación
   * @returns {Promise<void>}
   */
  const performCheckIn = async () => {
    try {
      // Verificar si la biometría está habilitada y disponible
      const authStateController = new AuthStateController()
      const authState = await authStateController.getAuthState()
      const biometricsEnabled = authState?.props.biometricsPreferences?.isEnabled ?? false
      
      const biometricService = new BiometricsService()
      const isBiometricAvailable = await biometricService.isBiometricAvailable()
      
      let isAuthenticated = false
      
      if (biometricsEnabled && isBiometricAvailable) {
        // Intentar autenticación biométrica primero
        try {
          isAuthenticated = await biometricService.authenticate()
        } catch (biometricError) {
          console.error('Error en autenticación biométrica:', biometricError)
          // Si la biometría falla, continuar con contraseña como fallback
        }
      }
      
      // Si la biometría no está disponible, no está habilitada, o falló, solicitar contraseña
      if (!isAuthenticated) {
        const passwordService = new PasswordPromptService()
        const passwordResult = await passwordService.authenticateWithPassword()
        
        if (!passwordResult.success) {
          if (passwordResult.error !== 'User cancelled') {
            Alert.alert(
              t('common.error'),
              passwordResult.error || t('errors.invalidPassword')
            )
          }
          return
        }
        
        isAuthenticated = true
      }
      
      // Si llegamos aquí, la autenticación fue exitosa
      if (isAuthenticated) {
        setIsButtonLocked(true)
        setCheckInTime(DateTime.now().setLocale('es').toFormat('HH:mm:ss'))

        setTimeout(() => {
          setIsButtonLocked(false)
        }, (2 * 1000))
      }
    } catch (error) {
      console.error('Error en autenticación:', error)
      Alert.alert(
        t('common.error'),
        error instanceof Error ? error.message : t('errors.unknownError')
      )
    }
  }

  /**
   * Formatea las coordenadas para mostrarlas en pantalla
   * @param {ILocationCoordinates} coordinates - Coordenadas a formatear
   * @returns {string} Coordenadas formateadas
   */
  const formatCoordinates = (coordinates: ILocationCoordinates): string => {
    return `${coordinates.latitude.toFixed(6)}, ${coordinates.longitude.toFixed(6)}`
  }

  /**
   * Obtiene el texto de precisión formateado
   * @param {ILocationCoordinates} coordinates - Coordenadas con precisión
   * @returns {string} Precisión formateada
   */
  const formatAccuracy = (coordinates: ILocationCoordinates): string => {
    return `±${coordinates.accuracy.toFixed(1)}m`
  }

  /**
   * Abre la configuración de ubicación del dispositivo
   * @returns {Promise<void>}
   */
  const openLocationSettings = async (): Promise<void> => {
    try {
      if (Platform.OS === 'ios') {
        // En iOS, abre la configuración general de privacidad y ubicación
        await Linking.openURL('app-settings:')
      } else {
        // En Android, intenta abrir la configuración de ubicación específica
        await Linking.openURL('android.settings.LOCATION_SOURCE_SETTINGS')
      }
    } catch (error) {
      console.error('Error abriendo configuración de ubicación:', error)
      // Si no se puede abrir la configuración específica, abre la configuración general
      try {
        await Linking.openSettings()
      } catch (fallbackError) {
        console.error('Error abriendo configuración general:', fallbackError)
        Alert.alert(
          t('common.error'),
          'No se pudo abrir la configuración del dispositivo'
        )
      }
    }
  }

  return {
    themeType,
    isButtonLocked,
    isLoadingLocation,
    handleCheckIn,
    checkInTime,
    currentLocation,
    formatCoordinates,
    formatAccuracy
  }
}

export { AttendanceCheckScreenController }
