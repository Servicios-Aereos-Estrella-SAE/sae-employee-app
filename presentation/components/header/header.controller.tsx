import { useEffect, useState } from 'react'
import { AuthStateController } from '../../../src/features/authentication/infrastructure/controllers/auth-state.controller'

/**
 * Controlador del header del layout
 * @returns {Object} Propiedades y funciones accesibles desde la UI
 * @property {Function} getAuthenticatedUserName - Obtiene el nombre del usuario autenticado
 * @property {Function} getUserImage - Obtiene la imagen del usuario
 */ 
const HeaderLayoutController = () => {
  const [authUserAvatarType, setAuthUserAvatarType] = useState<string>('text')
  const [authUserAvatarSource, setAuthUserAvatarSource] = useState<string>('')

  useEffect(() => {    
    void authUserAvatar()
  }, [])

  /**
   * Obtiene el nombre de usuario de la sesión actual
   * @returns {Promise<string>} Nombre de usuario
   */
  const authUserName = async (): Promise<string> => {
    const authStateController = new AuthStateController()
    const authState = await authStateController.getAuthState()
    return authState?.props.authState?.user?.props.person?.props.firstname || ''
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

  return {
    authUserAvatarType,
    authUserAvatarSource,
    authUserName
  }
}

export default HeaderLayoutController
