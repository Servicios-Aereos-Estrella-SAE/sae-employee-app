/**
 * Controlador del header del layout
 * @returns {Object} Propiedades y funciones accesibles desde la UI
 * @property {Function} getAuthenticatedUserName - Obtiene el nombre del usuario autenticado
 * @property {Function} getUserImage - Obtiene la imagen del usuario
 */ 
const HeaderLayoutController = () => {
  /**
   * Obtiene el nombre del usuario autenticado
   * @returns {string} Nombre del usuario autenticado
   */
  const getAuthenticatedUserName = (): string => {
    const userName = 'Wilvardo'
    return `${userName}`
  }

  /**
   * Obtiene la imagen del usuario
   * @returns {string} La imagen del usuario
   */
  const getUserImage = (): string => {
    const userImage = 'https://randomuser.me/api/portraits/men/1.jpg'
    return userImage
  }

  return {
    getAuthenticatedUserName,
    getUserImage
  }
}

export default HeaderLayoutController
