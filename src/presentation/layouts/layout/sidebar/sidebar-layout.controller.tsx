import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../navigation/types/types'
import { useAppTheme } from '../../../theme/theme-context'

// import { UserController } from '../../../models/user-old/infrastructure/UserController'
// import { AuthService } from '../../../models/user-old/application/AuthService'

const SidebarLayoutController = () => {
  const { themeType, toggleTheme } = useAppTheme()
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  // const userController = new UserController()
  // const authService = new AuthService(userController)

  const handleLogout = async () => {
    // await authService.clearAuthState()
    navigation.replace('Login')
  }
  const handleFullLogout = async () => {
    // await authService.clearFullAuthState()
    navigation.replace('Login')
  }

  const toggleThemeLabel = themeType === 'dark' ? 'Modo Oscuro' : 'Modo Claro'
  const themeIsDark = themeType === 'dark'

  return {
    handleLogout,
    handleFullLogout,
    toggleThemeLabel,
    toggleTheme,
    themeIsDark
  }
}

export default SidebarLayoutController
