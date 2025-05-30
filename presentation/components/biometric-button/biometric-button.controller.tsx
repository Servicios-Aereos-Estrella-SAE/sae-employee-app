/**
 * Controlador del botón de biometría
 * @returns {BiometricButtonController} Controlador del botón de biometría
 * @property {() => void} biometricTapHandler - Manejador de pulsación de biometría
 */
const BiometricButtonController = () => {
  
  /**
   * Manejador de pulsación de biometría
   * @param {() => void} callback - Callback a ejecutar al pulsar el botón de biometría
   */
  const biometricTapHandler = (callback: () => void) => {
    callback()
  }

  return {
    biometricTapHandler
  }
}

export { BiometricButtonController }
