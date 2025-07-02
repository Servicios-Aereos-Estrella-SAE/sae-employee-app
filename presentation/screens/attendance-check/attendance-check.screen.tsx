import BottomSheet from '@gorhom/bottom-sheet'
import { StatusBar } from 'expo-status-bar'
import React, { useMemo } from 'react'
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInLeft,
  ZoomIn
} from 'react-native-reanimated'
import { Clock } from '../../components/clock/clock.component'
import { Typography } from '../../components/typography/typography.component'
import { CheckInIcon } from '../../icons/check-in-icon/check-in.icon'
import { CheckOutIcon } from '../../icons/check-out-icon/check-out.icon'
import AuthenticatedLayout from '../../layouts/authenticated-layout/authenticated.layout'
import { AttendanceCheckScreenController } from './attendance-check-screen.controller'
import useAttendanceCheckStyle from './attendance-check.style'
import { PasswordBottomSheet } from './password-bottom-sheet.component'

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

/**
 * Pantalla para registro de asistencia
 * @returns {React.FC} 
 */
export const AttendanceCheckScreen: React.FC = React.memo(() => {
  const controller = AttendanceCheckScreenController()
  const styles = useAttendanceCheckStyle()

  // Solo las optimizaciones que dependen de styles se quedan aquí
  const buttonWrapperStyles = useMemo(() => [
    styles.checkInButtonWrapper,
    controller.isButtonDisabled && styles.checkInButtonWrapperLocked
  ], [styles.checkInButtonWrapper, styles.checkInButtonWrapperLocked, controller.isButtonDisabled])

  const buttonStyles = useMemo(() => [
    styles.checkInButton,
    controller.isButtonDisabled && styles.checkInButtonLocked
  ], [styles.checkInButton, styles.checkInButtonLocked, controller.isButtonDisabled])

  const buttonTextStyles = useMemo(() => [
    styles.checkInText,
    controller.isButtonDisabled && styles.checkInTextLocked
  ], [styles.checkInText, styles.checkInTextLocked, controller.isButtonDisabled])

  const buttonIconColor = useMemo(() => 
    controller.isButtonDisabled ? styles.checkButtonIconLocked.color : styles.checkButtonIcon.color, [controller.isButtonDisabled, styles.checkButtonIconLocked.color, styles.checkButtonIcon.color]
  )

  return (
    <GestureHandlerRootView>
      <AuthenticatedLayout>
        <View style={styles.backgroundWrapper}>
          <SafeAreaView style={styles.container}>
            <StatusBar style={controller.themeType === 'light' ? 'light' : 'light'} />

            <ScrollView 
              style={styles.scrollContainer}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {/* Título con animación */}
              <Animated.View
                entering={FadeInDown.delay(100).duration(300)}
              >
                <Typography variant="h2">
                  Registro de Asistencia
                </Typography>
              </Animated.View>

              {/* Botón principal con animación */}
              <Animated.View 
                entering={ZoomIn.delay(200).duration(400)}
                style={[
                  styles.checkInContainer,
                  { zIndex: 10 }
                ]}
              >
                <View style={[
                  buttonWrapperStyles,
                  { zIndex: 10 }
                ]}>
                  <AnimatedTouchableOpacity
                    style={[
                      buttonStyles,
                      { zIndex: 10 }
                    ]}
                    onPress={controller.handleCheckIn}
                    disabled={controller.isButtonDisabled}
                    activeOpacity={0.8}
                  >
                    {controller.isLoadingLocation ? (
                      <ActivityIndicator 
                        size={48} 
                        color={styles.checkButtonIcon.color} 
                      />
                    ) : (
                      <CheckInIcon
                        size={48}
                        color={buttonIconColor}
                      />
                    )}
                    <Typography variant="body" style={buttonTextStyles as any}>
                      {controller.buttonText}
                    </Typography>
                  </AnimatedTouchableOpacity>
                </View>
              </Animated.View>

              {/* Tarjeta del reloj con animación */}
              <Animated.View 
                entering={ZoomIn.delay(250).duration(400)}
                style={[
                  styles.bottomCard,
                  { zIndex: 1 }
                ]}
              >
                <Clock 
                  style={styles.timeContainer}
                  hourStyle={styles.hour}
                  dateStyle={styles.date}
                />
                <Typography variant="body" style={styles.dateShift}>
                  {controller.shiftDate}
                </Typography>
              </Animated.View>

              {/* Indicadores con animaciones staggered */}
              <Animated.View 
                entering={FadeIn.delay(400).duration(300)}
                style={[
                  styles.indicatorsContainer,
                  { zIndex: 1 }
                ]}
              >
                {/* Entrada */}
                <Animated.View 
                  entering={FadeInLeft.delay(500).duration(400)}
                  style={[ styles.indicator, controller.checkInTime && styles.indicatorActive ]}
                >
                  <CheckOutIcon
                    size={24}
                    color={ styles.checkIconIndicator.color }
                  />
                  <Typography variant="body2" style={[ styles.indicatorLabel, controller.checkInTime && styles.indicatorLabelActive ].filter(Boolean) as any}>
                      Entrada
                  </Typography>
                  <Typography variant="body2" style={[ styles.indicatorValue, controller.checkInTime && styles.indicatorValueActive ].filter(Boolean) as any}>
                    {controller.checkInTime || '--:--'}
                  </Typography>
                </Animated.View>

                {/* Iniciar Comida */}
                <Animated.View 
                  entering={FadeInLeft.delay(650).duration(400)}
                  style={[ styles.indicator, controller.checkInTime && styles.indicatorActive ]}
                >
                  <CheckOutIcon
                    size={24}
                    color={ styles.checkIconIndicator.color }
                  />
                  <Typography variant="body2" style={[ styles.indicatorLabel, controller.checkInTime && styles.indicatorLabelActive ].filter(Boolean) as any}>
                      Iniciar Comida
                  </Typography>
                  <Typography variant="body2" style={[ styles.indicatorValue, controller.checkInTime && styles.indicatorValueActive ].filter(Boolean) as any}>
                      --:--:--
                  </Typography>
                </Animated.View>

                {/* Terminar Comida */}
                <Animated.View 
                  entering={FadeInLeft.delay(800).duration(400)}
                  style={[ styles.indicator, controller.checkInTime && styles.indicatorActive ]}
                >
                  <CheckOutIcon
                    size={24}
                    color={ styles.checkIconIndicator.color }
                  />
                  <Typography variant="body2" style={[ styles.indicatorLabel, controller.checkInTime && styles.indicatorLabelActive ].filter(Boolean) as any}>
                      Terminar Comida
                  </Typography>
                  <Typography variant="body2" style={[ styles.indicatorValue, controller.checkInTime && styles.indicatorValueActive ].filter(Boolean) as any}>
                      --:--:--
                  </Typography>
                </Animated.View>

                {/* Salida */}
                <Animated.View 
                  entering={FadeInLeft.delay(950).duration(400)}
                  style={[ styles.indicator, controller.checkInTime && styles.indicatorActive ]}
                >
                  <CheckOutIcon
                    size={24}
                    color={ styles.checkIconIndicator.color }
                  />
                  <Typography variant="body2" style={[ styles.indicatorLabel, controller.checkInTime && styles.indicatorLabelActive ].filter(Boolean) as any}>
                      Salida
                  </Typography>
                  <Typography variant="body2" style={[ styles.indicatorValue, controller.checkInTime && styles.indicatorValueActive ].filter(Boolean) as any}>
                      --:--:--
                  </Typography>
                </Animated.View>
              </Animated.View>
            </ScrollView>
          </SafeAreaView>
        </View>

        <BottomSheet
          ref={controller.bottomSheetRef}
          index={-1}
          snapPoints={controller.snapPoints}
          enablePanDownToClose={false}
          onClose={controller.onClosePasswordDrawer}
          backdropComponent={controller.backdropComponent}
          animateOnMount={true}
          enableOverDrag={false}
        >
          <PasswordBottomSheet
            onPasswordSubmit={controller.onPasswordSubmit}
            onCancel={controller.onConfirmPasswordDrawer}
            error={controller.passwordError}
          />
        </BottomSheet>
      </AuthenticatedLayout>
    </GestureHandlerRootView>
  )
})
