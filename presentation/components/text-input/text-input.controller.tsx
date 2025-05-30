import { useState } from 'react'

/**
 * Controlador del campo de texto
 * @returns {Object} Propiedades y funciones accesibles desde la UI
 * @property {boolean} passwordVisible - Indica si la contraseña está visible
 * @property {() => void} togglePasswordVisibility - Función para alternar la visibilidad de la contraseña
 */
const TextInputController = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)

  /**
   * Alterna la visibilidad de la contraseña
   * @returns {void}
   */
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  return {
    passwordVisible,
    togglePasswordVisibility
  }
}

export default TextInputController
