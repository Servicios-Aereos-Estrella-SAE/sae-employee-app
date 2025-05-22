/**
 * Propiedades del sidebar
 * @interface
 * @property {boolean} isOpen - Estado del sidebar (true: abierto, false: cerrado)
 * @property {Function} onClose - Función para cerrar el sidebar
 */
export interface ISidebarProps {
  /**
   * Estado del sidebar
   * @type {boolean}
   */
  isOpen: boolean

  /**
   * Función para cerrar el sidebar
   * @returns {void}
   */
  onClose: () => void
}
