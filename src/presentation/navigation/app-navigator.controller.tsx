import { useState, useEffect } from 'react'
import { RootStackParamList } from './types/types'

const AppNavigatorController = () => {
  const [isLoading, setIsLoading] = useState(true)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // const userController = new UserController()
  // const authService = new AuthService(userController)

  useEffect(() => {
    checkAuthState()
  }, [])

  const checkAuthState = async () => {
    // try {
    //   const { token, user } = await authService.getAuthState()
    //   setIsAuthenticated(!!token && !!user)
    // } catch (error) {
    //   console.error('Error checking auth state:', error)
    // } finally {
    setIsLoading(false)
    // }
  }

  const getInitialRouteName = (): keyof RootStackParamList => {
    return isAuthenticated ? 'attendanceCheck' : 'authenticationScreen'
  }

  return {
    isLoading,
    isAuthenticated,
    getInitialRouteName
  }
}

export default AppNavigatorController
