import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { DateTime } from 'luxon'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, Linking, Platform } from 'react-native'
import { AuthStateController } from '../../../src/features/authentication/infrastructure/controllers/auth-state.controller'
import { BiometricsService } from '../../../src/features/authentication/infrastructure/services/biometrics.service'
import { ILocationCoordinates, LocationService } from '../../../src/features/authentication/infrastructure/services/location.service'
import { PasswordPromptService } from '../../../src/features/authentication/infrastructure/services/password-prompt.service'
import { useAppTheme } from '../../theme/theme-context'

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
  const [showPasswordDrawer, setShowPasswordDrawer] = useState(false)
  const [onPasswordSuccess, setOnPasswordSuccess] = useState<(() => void) | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [password, setPassword] = useState('')
  
  // Memorizar snapPoints para evitar recreaciones
  const snapPoints = useMemo(() => ['65%'], [])

  // Abrir/cerrar drawer según controller
  useEffect(() => {
    if (showPasswordDrawer) {
      bottomSheetRef.current?.snapToIndex(0)
    } else {
      bottomSheetRef.current?.close()
      setPassword('')
    }
  }, [showPasswordDrawer])

  // Validar contraseña
  const handlePasswordSubmit = useCallback(async () => {
    const error = await validatePassword(password)
    if (!error) {
      onPasswordSuccess?.()
    } else {
      setPasswordError(error)
    }
  }, [password, onPasswordSuccess])

  /**
   * Expone validatePassword para la pantalla
   * @param {string} password - Contraseña a validar
   * @returns {Promise<string | null>} Mensaje de error o null si la contraseña es válida
   */
  const validatePassword = useCallback(async (password: string): Promise<string | null> => {
    try {
      const passwordService = new PasswordPromptService()
      await passwordService.validatePassword(password)
      return null
    } catch (error) {
      return error instanceof Error ? error.message : t('errors.invalidPassword')
    }
  }, [t])

  /**
   * Maneja el evento de registro de asistencia
   * - Valida ubicación precisa antes de permitir el check-in
   * - Obtiene coordenadas y las muestra en pantalla
   * @returns {Promise<void>}
   */
  const handleCheckIn = useCallback(async () => {
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
  }, [isButtonLocked, isLoadingLocation, t])

  /**
   * Ejecuta el proceso de check-in después de validar la ubicación
   * @returns {Promise<void>}
   */
  const performCheckIn = useCallback(async () => {
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
        // En vez de pedir contraseña aquí, muestra el drawer y espera
        setShowPasswordDrawer(true)
        // Devuelve una promesa que se resuelve cuando la pantalla valide la contraseña
        await new Promise<void>((resolve) => {
          setOnPasswordSuccess(() => () => {
            setShowPasswordDrawer(false)
            setPasswordError(null)
            resolve()
          })
        })
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
  }, [t])

  /**
   * Formatea las coordenadas para mostrarlas en pantalla
   * @param {ILocationCoordinates} coordinates - Coordenadas a formatear
   * @returns {string} Coordenadas formateadas
   */
  const formatCoordinates = useCallback((coordinates: ILocationCoordinates): string => {
    return `${coordinates.latitude.toFixed(6)}, ${coordinates.longitude.toFixed(6)}`
  }, [])

  /**
   * Obtiene el texto de precisión formateado
   * @param {ILocationCoordinates} coordinates - Coordenadas con precisión
   * @returns {string} Precisión formateada
   */
  const formatAccuracy = useCallback((coordinates: ILocationCoordinates): string => {
    return `±${coordinates.accuracy.toFixed(1)}m`
  }, [])

  /**
   * Abre la configuración de ubicación del dispositivo
   * @returns {Promise<void>}
   */
  const openLocationSettings = useCallback(async (): Promise<void> => {
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
  }, [t])

  const onClosePasswordDrawer = useCallback(() => {
    setShowPasswordDrawer(false)
    setPassword('')
    setPasswordError(null)
    setIsLoadingLocation(false)
  }, [])

  const setPasswordHandler = useCallback((password: string) => {
    setPassword(password)
  }, [])

  const onConfirmPasswordDrawer = useCallback(() => {
    setShowPasswordDrawer(false)
    setPassword('')
    setPasswordError(null)
    setIsLoadingLocation(false)
  }, [])

  const onPasswordSubmit = useCallback(async (password: string) => {
    const error = await validatePassword(password)
    if (!error) {
      onPasswordSuccess?.()
    } else {
      setPasswordError(error)
      throw new Error(error) // Throw para que el componente maneje el error
    }
  }, [onPasswordSuccess, validatePassword])

  // Optimizaciones movidas desde el componente
  const isButtonDisabled = useMemo(() => 
    isButtonLocked || isLoadingLocation, [isButtonLocked, isLoadingLocation]
  )

  const buttonText = useMemo(() => {
    if (isLoadingLocation) return '...'
    if (isButtonLocked) return '---'
    return 'Iniciar Turno'
  }, [isLoadingLocation, isButtonLocked])

  const locationContent = useMemo(() => {
    if (currentLocation) {
      return {
        coordinates: formatCoordinates(currentLocation),
        accuracy: formatAccuracy(currentLocation)
      }
    }
    return null
  }, [currentLocation, formatCoordinates, formatAccuracy])

  const backdropComponent = useCallback((props: any) => (
    <BottomSheetBackdrop 
      {...props} 
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      opacity={0.5}
    />
  ), [])

  // Memorizar el objeto de retorno completo para evitar recreaciones innecesarias
  const controllerValue = useMemo(() => ({
    themeType,
    isButtonLocked,
    isLoadingLocation,
    handleCheckIn,
    checkInTime,
    currentLocation,
    formatCoordinates,
    formatAccuracy,
    bottomSheetRef,
    snapPoints,
    showPasswordDrawer,
    setShowPasswordDrawer,
    validatePassword,
    passwordError,
    setPasswordError,
    onPasswordSuccess,
    setOnPasswordSuccess,
    handlePasswordSubmit,
    onClosePasswordDrawer,
    password,
    setPasswordHandler,
    onConfirmPasswordDrawer,
    onPasswordSubmit,
    // Nuevas optimizaciones
    isButtonDisabled,
    buttonText,
    locationContent,
    backdropComponent
  }), [
    themeType,
    isButtonLocked,
    isLoadingLocation,
    handleCheckIn,
    checkInTime,
    currentLocation,
    formatCoordinates,
    formatAccuracy,
    snapPoints,
    showPasswordDrawer,
    validatePassword,
    passwordError,
    onPasswordSuccess,
    handlePasswordSubmit,
    onClosePasswordDrawer,
    password,
    setPasswordHandler,
    onConfirmPasswordDrawer,
    onPasswordSubmit,
    isButtonDisabled,
    buttonText,
    locationContent,
    backdropComponent
  ])

  return controllerValue
}

export { AttendanceCheckScreenController }
