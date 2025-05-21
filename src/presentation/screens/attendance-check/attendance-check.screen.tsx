 
import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  AppState,
  AppStateStatus
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useFocusEffect } from '@react-navigation/native'
import AuthenticatedLayout from '../../layouts/authenticated-layout/authenticated.layout'
import { CheckInIcon } from '../../components/icons/CheckInIcon'
import { CheckInOutIcon } from '../../components/icons/CheckInOutIcon'
// import { UserController } from '../../../models/user-old/infrastructure/UserController'
// import { useAppTheme } from '../../theme/ThemeContext'

import { DateTime } from 'luxon'
import { useAppTheme } from '../../theme/theme-context'

export const AttendanceCheckScreen: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(DateTime.now().setLocale('es'))
  // const [isButtonLocked, setIsButtonLocked] = useState(false)
  // const [checkInTime, setCheckInTime] = useState<string | null>(null)

  const isButtonLocked = false
  const checkInTime = null

  // const [showBiometric, setShowBiometric] = useState(false)
  // const [biometricType, setBiometricType] = useState<'fingerprint' | 'face'>(
  //   'fingerprint'
  // )
  // const userController = new UserController()
  const { theme, themeType } = useAppTheme()
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const appStateRef = useRef(AppState.currentState)

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

  const handleCheckIn = async () => {
    // if (isButtonLocked) return
    // try {
    //   const isAuthenticated = await userController.authenticateWithBiometrics()
    //   if (isAuthenticated) {
    //     setIsButtonLocked(true)
    //     setCheckInTime(currentTime.toFormat('HH:mm:ss'))

    //     setTimeout(() => {
    //       setIsButtonLocked(false)
    //     }, 10000)
    //   }
    // } catch (error) {
    //   console.error('Error en autenticación biométrica:', error)
    // }
    return
  }

  const hour = currentTime.toFormat('HH:mm:ss')
  const date = currentTime.toFormat('DDDD')

  return (
    <AuthenticatedLayout>
      <View
        style={[
          styles.backgroundWrapper,
          { backgroundColor: theme.colors.background }
        ]}
      >
        <ImageBackground
          source={require('../../../../assets/images/dots.jpg')}
          style={styles.backgroundImage}
          imageStyle={{ opacity: themeType === 'dark' ? 0 : 0.8 }}
        >
          <SafeAreaView style={styles.container}>
            <StatusBar style={themeType === 'dark' ? 'light' : 'dark'} />
            <View style={styles.checkInContainer}>
              <View
                style={[
                  styles.checkInButtonWrapper,
                  isButtonLocked && styles.checkInButtonWrapperLocked,
                  {
                    backgroundColor: isButtonLocked
                      ? theme.colors.background
                      : theme.colors.accent
                  }
                ]}
              >
                <TouchableOpacity
                  style={[
                    styles.checkInButton,
                    isButtonLocked && styles.checkInButtonLocked,
                    {
                      backgroundColor: isButtonLocked
                        ? theme.colors.background
                        : theme.colors.button
                    }
                  ]}
                  onPress={handleCheckIn}
                  disabled={isButtonLocked}
                >
                  <CheckInIcon
                    size={48}
                    color={
                      isButtonLocked
                        ? theme.colors.textSecondary
                        : theme.colors.buttonText
                    }
                  />
                  <Text
                    style={[
                      styles.checkInText,
                      isButtonLocked && styles.checkInTextLocked,
                      {
                        color: isButtonLocked
                          ? theme.colors.textSecondary
                          : theme.colors.buttonText
                      }
                    ]}
                  >
                    {isButtonLocked ? '---' : 'Iniciar Turno'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Contenido inferior en fondo blanco */}
            <View
              style={[
                styles.bottomCard,
                { backgroundColor: theme.colors.cardBgColor }
              ]}
            >
              <View style={styles.timeContainer}>
                <Text style={[styles.hour, { color: theme.colors.text }]}>
                  {hour}
                </Text>
                <Text style={[styles.date, { color: theme.colors.text }]}>
                  {date.charAt(0).toUpperCase() + date.slice(1)}
                </Text>
              </View>
              {/* Indicadores */}
              <View style={styles.indicatorsContainer}>
                <View
                  style={[
                    styles.indicator,
                    checkInTime && styles.indicatorActive,
                    { backgroundColor: theme.colors.indicator },
                    checkInTime && {
                      backgroundColor: theme.colors.indicatorActive
                    }
                  ]}
                >
                  <CheckInOutIcon
                    size={24}
                    color={
                      checkInTime
                        ? theme.colors.accent
                        : theme.colors.textSecondary
                    }
                  />
                  <Text
                    style={[
                      styles.indicatorLabel,
                      checkInTime && styles.indicatorLabelActive,
                      { color: theme.colors.textSecondary },
                      checkInTime && { color: theme.colors.accent }
                    ]}
                  >
                    Entrada
                  </Text>
                  <Text
                    style={[
                      styles.indicatorValue,
                      checkInTime && styles.indicatorValueActive,
                      { color: theme.colors.textSecondary },
                      checkInTime && { color: theme.colors.accent }
                    ]}
                  >
                    {checkInTime || '--:--'}
                  </Text>
                </View>
                <View
                  style={[
                    styles.indicator,
                    { backgroundColor: theme.colors.indicator }
                  ]}
                >
                  <CheckInOutIcon
                    size={24}
                    color={theme.colors.textSecondary}
                  />
                  <Text
                    style={[
                      styles.indicatorLabel,
                      { color: theme.colors.textSecondary }
                    ]}
                  >
                    Iniciar Comida
                  </Text>
                  <Text
                    style={[
                      styles.indicatorValue,
                      { color: theme.colors.textSecondary }
                    ]}
                  >
                    --:--:--
                  </Text>
                </View>
                <View
                  style={[
                    styles.indicator,
                    { backgroundColor: theme.colors.indicator }
                  ]}
                >
                  <CheckInOutIcon
                    size={24}
                    color={theme.colors.textSecondary}
                  />
                  <Text
                    style={[
                      styles.indicatorLabel,
                      { color: theme.colors.textSecondary }
                    ]}
                  >
                    Terminar Comida
                  </Text>
                  <Text
                    style={[
                      styles.indicatorValue,
                      { color: theme.colors.textSecondary }
                    ]}
                  >
                    --:--:--
                  </Text>
                </View>
                <View
                  style={[
                    styles.indicator,
                    { backgroundColor: theme.colors.indicator }
                  ]}
                >
                  <CheckInOutIcon
                    size={24}
                    color={theme.colors.textSecondary}
                  />
                  <Text
                    style={[
                      styles.indicatorLabel,
                      { color: theme.colors.textSecondary }
                    ]}
                  >
                    Salida
                  </Text>
                  <Text
                    style={[
                      styles.indicatorValue,
                      { color: theme.colors.textSecondary }
                    ]}
                  >
                    --:--:--
                  </Text>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>
    </AuthenticatedLayout>
  )
}

const styles = StyleSheet.create({
  backgroundWrapper: {
    flex: 1
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  checkInContainer: {
    marginTop: 85,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    zIndex: 1
  },
  checkInButtonWrapper: {
    borderRadius: 110,
    padding: 10,
    shadowColor: '#88a4bf',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -80,
    zIndex: 1
  },
  checkInButton: {
    borderRadius: 100,
    width: 180,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#093057',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8
  },
  checkInText: {
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: 12
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 20,
    position: 'absolute',
    right: 16,
    top: 50,
    zIndex: 10
  },
  themeToggleText: {
    marginLeft: 8,
    fontWeight: '500'
  },
  themeInfo: {
    marginBottom: 12,
    padding: 8,
    borderRadius: 8,
    alignItems: 'center'
  },
  themeInfoText: {
    fontSize: 12,
    fontWeight: '500'
  },
  timeContainer: {
    marginTop: 32,
    alignItems: 'center'
  },
  hour: {
    fontSize: 40,
    fontWeight: 'bold'
  },
  date: {
    fontSize: 18,
    marginTop: 4,
    textTransform: 'capitalize'
  },
  indicatorsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 36,
    gap: 10,
    width: '100%'
  },
  indicator: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 15
  },
  indicatorLabel: {
    fontSize: 14,
    flex: 1,
    marginLeft: 16
  },
  indicatorValue: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    textAlign: 'right',
    marginLeft: 24
  },
  indicatorActive: {},
  indicatorLabelActive: {},
  indicatorValueActive: {},
  bottomCard: {
    borderRadius: 32,
    marginTop: 32,
    width: '92%',
    alignSelf: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
    shadowColor: '#093057',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8
  },
  checkInButtonWrapperLocked: {
    opacity: 1
  },
  checkInButtonLocked: {},
  checkInTextLocked: {},
  biometricContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20
  },
  cancelButton: {
    backgroundColor: '#f1f5f9',
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 16
  },
  cancelButtonText: {
    color: '#88a4bf',
    fontWeight: 'bold',
    fontSize: 16
  }
})

export default AttendanceCheckScreen
