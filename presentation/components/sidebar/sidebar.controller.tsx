import React, { useEffect, useState } from 'react'
import { Animated, Dimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../navigation/types/types'
import { useAppTheme } from '../../theme/theme-context'
import { ISidebarProps } from './types/sidebar-props.interface'
import { AuthStateController } from '../../../src/features/authentication/infrastructure/controllers/auth-state.controller'
import { ClearSessionController } from '../../../src/features/authentication/infrastructure/controllers/clear-seassion.controller'

/**
 * Controlador del sidebar
 * @param {ISidebarProps} props - Propiedades del sidebar
 * @returns {Object} Propiedades y funciones accesibles desde la UI
 * @property {Function} onClose - Función para cerrar el sidebar
 * @property {boolean} isOpen - Estado del sidebar
 * @property {Function} handleLogout - Función para cerrar sesión
 * @property {Function} handleFullLogout - Función para cerrar sesión y redirigir a la pantalla de autenticación
 * @property {string} themeType - Tipo de tema (dark o light)
 * @property {Function} toggleTheme - Función para cambiar el tema
 * @property {Animated.Value} translateX - Valor de la animación de la barra lateral
 * @property {EdgeInsets} insets - Insets de la pantalla
 * @property {string} authUserAvatarType - Tipo de avatar del usuario
 * @property {string} authUserAvatarSource - Fuente del avatar del usuario
 * @property {string} authUserName - Nombre del usuario
 * @property {string} authUserEmail - Correo electrónico del usuario
 */
const SidebarController = (props: ISidebarProps) => {
  const { width } = Dimensions.get('window')
  const translateX = React.useRef(new Animated.Value(-width)).current
  const insets = useSafeAreaInsets()

  const { themeType, toggleTheme } = useAppTheme()
  const [authUserAvatarType, setAuthUserAvatarType] = useState<string>('text')
  const [authUserAvatarSource, setAuthUserAvatarSource] = useState<string>('')

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: props.isOpen ? 0 : -width,
      duration: 300,
      useNativeDriver: true
    }).start()
    
    void authUserAvatar()
  }, [props.isOpen])

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  /**
   * Cierra sesión y redirige a la pantalla de autenticación
   * - Elimina el estado de autenticación manteniendo al usuario en memoria local
   * - Redirige a la pantalla de autenticación
   * @returns {void}
   */
  const handleLogout = async () => {
    const clearSessionController = new ClearSessionController()
    await clearSessionController.clearSession()
    navigation.replace('authenticationScreen')
  }

  /**
   * Cierra sesión y redirige a la pantalla de autenticación
   * - Elimina por completo el estado de autenticación
   * - Redirige a la pantalla de autenticación
   * @returns {void}
   */
  const handleFullLogout = async () => {
    // await authService.clearFullAuthState()
    navigation.replace('authenticationScreen')
  }

  /**
   * Obtiene el nombre de usuario de la sesión actual
   * @returns {Promise<string>} Nombre de usuario
   */
  const authUserName = async (): Promise<string> => {
    const authStateController = new AuthStateController()
    const authState = await authStateController.getAuthState()
    return authState?.props.authState?.user?.props.person?.getFullName() || ''
  }

  /**
   * Obtiene el correo electrónico del usuario de la sesión actual
   * @returns {Promise<string>} Correo electrónico
   */
  const authUserEmail = async (): Promise<string> => {
    const authStateController = new AuthStateController()
    const authState = await authStateController.getAuthState()
    const email = authState?.props.authState?.user?.props?.email?.value
    return `${(email || '')}`.toString().toLocaleLowerCase()
  }

  /**
   * Establece el tipo y fuente del avatar del usuario de la sesión actual
   * @returns {Promise<void>}
   */
  const authUserAvatar = async (): Promise<void> => {
    const authStateController = new AuthStateController()
    const authState = await authStateController.getAuthState()
    const avatar = authState?.props.authState?.user?.props?.person?.props?.employee?.props?.photo || ''
    const initial = authState?.props.authState?.user?.props?.person?.props?.firstname?.charAt(0).toUpperCase() || ''

    setAuthUserAvatarType(avatar ? 'image' : 'text')
    setAuthUserAvatarSource(avatar || initial)
  }

  /**
   * Navega a la pantalla especificada
   * @param {keyof RootStackParamList} screen - Nombre de la pantalla a la que se navegará
   * @returns {void}
   */
  const navigateTo = (screen: keyof RootStackParamList) => {
    props.onClose()
    navigation.navigate(screen)
  }

  return {
    onClose: props.onClose,
    isOpen: props.isOpen,
    translateX,
    insets,
    handleLogout,
    handleFullLogout,
    themeType,
    toggleTheme,
    authUserName,
    authUserEmail,
    authUserAvatarType,
    authUserAvatarSource,
    navigateTo
  }
}

export default SidebarController
