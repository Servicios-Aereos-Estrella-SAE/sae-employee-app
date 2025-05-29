import { useNavigation } from '@react-navigation/native'
import { IAuthenticatedLayoutProps } from './types/authenticated-props.interface'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../navigation/types/types'
import { useEffect, useState } from 'react'
import { AuthStateController } from '../../../src/features/authentication/infrastructure/controllers/auth-state.controller'

/**
 * Controlador del layout autenticado
 * @param {IAuthenticatedLayoutProps} props - Propiedades del layout
 * @returns {Object} - Propiedades del layout autenticado y estado de validación
 * @property {IAuthenticatedLayoutProps} props - Propiedades del layout
 * @property {boolean} isValidating - Estado de validación
 */
const AuthenticatedLayoutController = (props: IAuthenticatedLayoutProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [isValidating, setIsValidating] = useState(true)

  useEffect(() => {
    const validateSession = async () => {
      try {
        const authStateController = new AuthStateController()
        const authState = await authStateController.getAuthState()

        if (!authState || !authState.props.authState?.isAuthenticated) {
          navigation.replace('authenticationScreen')
        }
      } catch (error) {
        console.error(error)
        navigation.replace('authenticationScreen')
      } finally {
        setIsValidating(false)
      }
    }

    validateSession().catch(console.error)
  }, [navigation])

  return {
    props,
    isValidating
  }
}

export { AuthenticatedLayoutController }
