import { useState, useEffect, useRef, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { DateTime } from 'luxon'
import { AppState, AppStateStatus } from 'react-native'
import { useAppTheme } from '../../theme/theme-context'

/**
 * Controlador para la pantalla de registro de asistencia
 * @returns {Object} Objeto con los datos y funciones accesibles desde la pantalla de registro de asistencia
 */
const AttendanceCheckScreenController = () => {
  const [currentTime, setCurrentTime] = useState(DateTime.now().setLocale('es'))
  const [isButtonLocked, setIsButtonLocked] = useState(false)
  const [checkInTime, setCheckInTime] = useState<string | null>(null)

  // const [showBiometric, setShowBiometric] = useState(false)
  // const [biometricType, setBiometricType] = useState<'fingerprint' | 'face'>(
  //   'fingerprint'
  // )

  const { themeType } = useAppTheme()
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const appStateRef = useRef(AppState.currentState)

  const hour = currentTime.toFormat('HH:mm:ss')
  const date = currentTime.toFormat('DDDD')

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    )

    return () => {
      stopTimer()
      subscription.remove()
    }
  }, [])

  useFocusEffect(
    useCallback(() => {
      setCurrentTime(DateTime.now().setLocale('es'))
      startTimer()

      return () => {
        stopTimer()
      }
    }, [])
  )

  const startTimer = () => {
    stopTimer()

    setCurrentTime(DateTime.now().setLocale('es'))

    const now = DateTime.now().setLocale('es')
    const millisToNextSecond = 1000 - now.millisecond
    const syncTimeout = setTimeout(() => {
      setCurrentTime(DateTime.now().setLocale('es'))

      timerRef.current = setInterval(() => {
        setCurrentTime(DateTime.now().setLocale('es'))
      }, 1000)
    }, millisToNextSecond)

    timerRef.current = syncTimeout as unknown as NodeJS.Timeout
  }

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      clearTimeout(timerRef.current as unknown as NodeJS.Timeout)
      timerRef.current = null
    }
  }

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (
      appStateRef.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      setCurrentTime(DateTime.now().setLocale('es'))
      startTimer()
    } else if (
      nextAppState.match(/inactive|background/) &&
      appStateRef.current === 'active'
    ) {
      stopTimer()
    }

    appStateRef.current = nextAppState
  }

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
      setCheckInTime(currentTime.toFormat('HH:mm:ss'))

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
    hour,
    date,
    checkInTime
  }
}

export { AttendanceCheckScreenController }
