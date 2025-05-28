import { useState } from 'react'
import { DateTime } from 'luxon'
import { useAppTheme } from '../../theme/theme-context'

/**
 * Controlador para la pantalla de registro de asistencia
 * @returns {Object} Objeto con los datos y funciones accesibles desde la pantalla de registro de asistencia
 */
const AttendanceCheckScreenController = () => {
  const [isButtonLocked, setIsButtonLocked] = useState(false)
  const [checkInTime, setCheckInTime] = useState<string | null>(null)
  const { themeType } = useAppTheme()

  /**
   * Maneja el evento de registro de asistencia
   * @returns {Promise<void>}
   */
  const handleCheckIn = async () => {
    if (isButtonLocked) return

    try {
      // const isAuthenticated = await userController.authenticateWithBiometrics()
      // if (isAuthenticated) {
      //   setIsButtonLocked(true)
      //   setCheckInTime(currentTime.toFormat('HH:mm:ss'))

      //   setTimeout(() => {
      //     setIsButtonLocked(false)
      //   }, 10000)
      // }
      setIsButtonLocked(true)
      setCheckInTime(DateTime.now().setLocale('es').toFormat('HH:mm:ss'))

      setTimeout(() => {
        setIsButtonLocked(false)
      }, 10000)
    } catch (error) {
      console.error('Error en autenticación biométrica:', error)
    }

    return
  }

  return {
    themeType,
    isButtonLocked,
    handleCheckIn,
    checkInTime
  }
}

export { AttendanceCheckScreenController }
