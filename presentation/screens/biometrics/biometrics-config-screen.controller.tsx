import { useState, useEffect } from 'react'
import { Alert, Platform } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../navigation/types/types'
import { BiometricsService } from '../../../src/features/authentication/infrastructure/services/biometrics.service'
import { AuthStateController } from '../../../src/features/authentication/infrastructure/controllers/auth-state.controller'
import { AuthenticationLocalStorageService } from '../../../src/features/authentication/infrastructure/services/authentication-local-storage.service'
import { AuthenticationEntity } from '../../../src/features/authentication/domain/entities/authentication-entity'
import { IBiometricsPreferences } from '../../../src/features/authentication/domain/types/authentication.interface'

/**
 * Controlador para la pantalla de configuración de biometría
 * @returns {Object} Objeto con los datos y funciones accesibles desde la pantalla de configuración de biometría
 */
const BiometricsConfigScreenController = () => {
  const [loading, setLoading] = useState(false)
  const [biometricAvailable, setBiometricAvailable] = useState(false)
  const [biometricType, setBiometricType] = useState<'fingerprint' | 'face'>('fingerprint')
  
  // Indicadores de soporte de hardware
  const [deviceSupportsFace, setDeviceSupportsFace] = useState(false)
  const [deviceSupportsFingerprint, setDeviceSupportsFingerprint] = useState(false)
  
  // Indicadores de registro (biometría realmente configurada en el dispositivo)
  const [hasEnrolledFaceID, setHasEnrolledFaceID] = useState(false)
  const [hasEnrolledFingerprint, setHasEnrolledFingerprint] = useState(false)
  
  const { t } = useTranslation()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  useEffect(() => {
    checkBiometricAvailability().catch(console.error)
  }, [])

  /**
   * Verifica si los biométricos están disponibles en el dispositivo
   * @returns {Promise<void>}
   */
  const checkBiometricAvailability = async (): Promise<void> => {
    try {
      const biometricService = new BiometricsService()
      
      // Verificar capacidades de hardware y biométricos registrados
      const deviceBiometrics = await biometricService.getAvailableBiometricTypes()
      
      // Establecer indicadores de soporte de hardware
      setDeviceSupportsFace(deviceBiometrics.supportsFaceID)
      setDeviceSupportsFingerprint(deviceBiometrics.supportsFingerprint)
      
      // Verificar si hay biométricos registrados
      const isBiometricAvailable = await biometricService.isBiometricAvailable()
      setBiometricAvailable(isBiometricAvailable)
      
      // Si no hay biométricos disponibles, no necesitamos continuar
      if (!isBiometricAvailable) {
        return
      }
      
      // Una mejor detección basada en la plataforma
      if (Platform.OS === 'ios') {
        // En iOS, podemos hacer mejores suposiciones sobre qué está disponible
        const isiPhoneX = Platform.OS === 'ios' && 
                          !Platform.isPad && 
                          !Platform.isTV && 
                          ((Platform.constants.reactNativeVersion.minor >= 50) || 
                           (Platform.constants.reactNativeVersion.minor >= 0 && 
                            Platform.constants.reactNativeVersion.major >= 0.6))
        
        if (isiPhoneX) {
          // iPhone X o posterior probablemente usa Face ID
          setHasEnrolledFaceID(true)
          setHasEnrolledFingerprint(false)
          setBiometricType('face')
        } else {
          // iPhone más antiguo probablemente usa Touch ID
          setHasEnrolledFaceID(false)
          setHasEnrolledFingerprint(true)
          setBiometricType('fingerprint')
        }
      } else {
        // En Android, asumimos que es fingerprint ya que es lo más común
        setHasEnrolledFaceID(false)
        setHasEnrolledFingerprint(true)
        setBiometricType('fingerprint')
      }
    } catch (error) {
      console.error('Error al verificar disponibilidad de biometría:', error)
      setBiometricAvailable(false)
    }
  }

  /**
   * Habilita los biométricos para el usuario
   * @returns {Promise<void>}
   */
  const enableBiometrics = async (): Promise<void> => {
    setLoading(true)
    
    try {
      const biometricService = new BiometricsService()
      
      // Verificar si los biométricos están disponibles
      if (!biometricAvailable) {
        Alert.alert(
          t('common.error'),
          t('errors.biometricsNotAvailable')
        )
        return
      }
      
      // Autenticar con biometría para confirmar la configuración
      // Pasar el tipo de biometría detectado para usar el mensaje apropiado
      const authenticated = await biometricService.authenticate(biometricType)
      
      if (authenticated) {
        // Actualizar preferencias de usuario
        await updateBiometricsPreferences(true)
        
        // Navegar a la pantalla de control de asistencia
        navigation.replace('attendanceCheck')
      } else {
        Alert.alert(
          t('common.error'),
          t('errors.biometricAuthenticationFailed')
        )
      }
    } catch (error) {
      Alert.alert(
        t('common.error'),
        error instanceof Error ? error.message : t('errors.unknownError')
      )
    } finally {
      setLoading(false)
    }
  }

  /**
   * Omite la configuración de biometría y navega a la pantalla de control de asistencia
   * @returns {Promise<void>}
   */
  const skipBiometricsSetup = async (): Promise<void> => {
    setLoading(true)
    
    try {
      // Actualizar preferencias de usuario para marcar que se ha mostrado el mensaje pero no se ha habilitado
      await updateBiometricsPreferences(false)
      
      // Navegar a la pantalla de control de asistencia
      navigation.replace('attendanceCheck')
    } catch (error) {
      Alert.alert(
        t('common.error'),
        error instanceof Error ? error.message : t('errors.unknownError')
      )
    } finally {
      setLoading(false)
    }
  }

  /**
   * Actualiza las preferencias de biometría del usuario
   * @param {boolean} isEnabled - Si los biométricos deben estar habilitados
   * @returns {Promise<void>}
   */
  const updateBiometricsPreferences = async (isEnabled: boolean): Promise<void> => {
    try {
      const authStateController = new AuthStateController()
      const authState = await authStateController.getAuthState()
      
      if (!authState) {
        throw new Error(t('errors.authStateNotFound'))
      }
      
      // Crear preferencias de biometría
      const biometricsPreferences: IBiometricsPreferences = {
        isConfigured: true,
        isEnabled,
        hasPromptBeenShown: true
      }
      
      // Crear entidad de autenticación actualizada
      const updatedAuth = new AuthenticationEntity({
        ...authState.props,
        biometricsPreferences
      })
      
      // Almacenar preferencias actualizadas
      const storageService = new AuthenticationLocalStorageService()
      await storageService.localStoreAuthenticationState(updatedAuth)
    } catch (error) {
      console.error('Error al actualizar preferencias de biometría:', error)
      throw error
    }
  }

  return {
    loading,
    biometricType,
    biometricAvailable,
    // Soporte de hardware
    deviceSupportsFace,
    deviceSupportsFingerprint,
    // Biométricos registrados
    hasEnrolledFaceID,
    hasEnrolledFingerprint,
    // Acciones
    enableBiometrics,
    skipBiometricsSetup
  }
}

export { BiometricsConfigScreenController }
