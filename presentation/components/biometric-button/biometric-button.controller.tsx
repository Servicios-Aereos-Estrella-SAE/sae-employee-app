const BiometricButtonController = () => {
  const biometricTapHandler = (callback: () => void) => {
    callback()
  }

  return {
    biometricTapHandler
  }
}

export default BiometricButtonController
