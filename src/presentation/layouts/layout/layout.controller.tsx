import { useState } from 'react'
import { ILayoutProps } from './types/layout-props.interface'

/**
 * Controlador del layout principal
 * @param {ILayoutProps} props - Propiedades del layout
 * @returns {Object} Propiedades y funciones accesibles desde la UI
 * @property {boolean} isSidebarOpen - Estado de la barra lateral
 * @property {Function} handleMenuPress - Función para abrir la barra lateral
 * @property {Function} handleCloseSidebar - Función para cerrar la barra lateral
 * @property {ILayoutProps} props - Propiedades del layout
 */
const LayoutController = (props: ILayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  /**
   * Abre la barra lateral
   * @returns {void}
   */
  const handleMenuPress = (): void => {
    setIsSidebarOpen(true)
  }

  /**
   * Cierra la barra lateral
   * @returns {void}
   */
  const handleCloseSidebar = (): void => {
    setIsSidebarOpen(false)
  }

  return {
    isSidebarOpen,
    handleMenuPress,
    handleCloseSidebar,
    props
  }
}

export default LayoutController
