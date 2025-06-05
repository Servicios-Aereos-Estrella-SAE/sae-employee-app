import { useState } from 'react'
import { Alert } from 'react-native'
import { DateTime } from 'luxon'
import { useTranslation } from 'react-i18next'
import { useAppTheme } from '../../theme/theme-context'
import { LocationService, ILocationCoordinates } from '../../../src/features/authentication/infrastructure/services/location.service'

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
        const coordinates = await locationService.getValidatedLocation(20) // Precisión de 20 metros - recomendado para asistencia laboral
        setCurrentLocation(coordinates)
        
        // Proceder con el check-in solo si la ubicación es válida
        await performCheckIn()
      } catch (locationError) {
        Alert.alert(
          t('common.error'),
          locationError instanceof Error 
            ? locationError.message 
            : t('errors.locationRequired')
        )
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
      // const isAuthenticated = await userController.authenticateWithBiometrics()
      // if (isAuthenticated) {
      //   setIsButtonLocked(true)
      //   setCheckInTime(currentTime.toFormat('HH:mm:ss'))

      //   setTimeout(() => {
      //     setIsButtonLocked(false)
      //   }, 10000)
      // }
      setIsButtonLocked(true)
      setCheckInTime(DateTime.now().setLocale('es').toFormat('HH:mm:ss'))

      setTimeout(() => {
        setIsButtonLocked(false)
      }, (2 * 1000))
    } catch (error) {
      console.error('Error en autenticación biométrica:', error)
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
