// import { useNavigation } from '@react-navigation/native'
// import { NativeStackNavigationProp } from '@react-navigation/native-stack'
// import { RootStackParamList } from '../../navigation/types/types'
// import { UserController } from '../../../models/user-old/infrastructure/UserController'
// import { AuthService } from '../../../models/user-old/application/AuthService'

// const ProfileScript = () => {
//   const navigation =
//     useNavigation<NativeStackNavigationProp<RootStackParamList>>()
//   const userController = new UserController()
//   const authService = new AuthService(userController)

//   const handleLogout = async () => {
//     await authService.clearAuthState()
//     navigation.replace('Login')
//   }

//   return {
//     handleLogout
//   }
// }

// export default ProfileScript
