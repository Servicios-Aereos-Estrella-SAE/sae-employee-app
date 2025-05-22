import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import AuthenticatedLayoutStyle from './authenticated-layout.style'
import { AuthStateController } from '../../../features/authentication/infrastructure/controllers/auth-state.controller'
import { RootStackParamList } from '../../navigation/types/types'
import Layout from '../layout/layout.layout'
interface AuthenticatedLayoutProps {
  children: React.ReactNode
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({
  children
}) => {
  const styles = AuthenticatedLayoutStyle()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [isValidating, setIsValidating] = useState(true)

  useEffect(() => {
    const validateSession = async () => {
      try {
        const authStateController = new AuthStateController()
        const authState = await authStateController.getAuthState()
        
        if (!authState) {
          navigation.replace('authenticationScreen')
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        navigation.replace('authenticationScreen')
      } finally {
        setIsValidating(false)
      }
    }

    validateSession()
  }, [navigation])

  if (isValidating) {
    return <View style={styles.container} />
  }

  return (
    <Layout>
      <View style={[styles.container]}>{children}</View>
    </Layout>
  )
}

export default AuthenticatedLayout
