import React, { useEffect } from 'react'
import { Animated, Dimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../navigation/types/types'
import { useAppTheme } from '../../theme/theme-context'
import { ISidebarProps } from './types/sidebar-props.interface'

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
 */
const SidebarController = (props: ISidebarProps) => {
  const { width } = Dimensions.get('window')
  const translateX = React.useRef(new Animated.Value(-width)).current
  const insets = useSafeAreaInsets()

  const { themeType, toggleTheme } = useAppTheme()

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: props.isOpen ? 0 : -width,
      duration: 300,
      useNativeDriver: true
    }).start()
     
  }, [props.isOpen])

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  // const userController = new UserController()
  // const authService = new AuthService(userController)

  /**
   * Cierra sesión y redirige a la pantalla de autenticación
   * - Elimina el estado de autenticación manteniendo al usuario en memoria local
   * - Redirige a la pantalla de autenticación
   * @returns {void}
   */
  const handleLogout = async () => {
    // await authService.clearAuthState()
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

  return {
    onClose: props.onClose,
    isOpen: props.isOpen,
    translateX,
    insets,
    handleLogout,
    handleFullLogout,
    themeType,
    toggleTheme
  }
}

export default SidebarController
