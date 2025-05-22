import React, { useEffect } from 'react'
import { Animated, Dimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigation/types/types'
import { useAppTheme } from '../../theme/theme-context'
import { ISidebarProps } from './types/sidebar-props.interface'

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

  const handleLogout = async () => {
    // await authService.clearAuthState()
    navigation.replace('authenticationScreen')
  }
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
