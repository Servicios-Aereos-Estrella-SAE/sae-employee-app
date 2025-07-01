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
import { Clock } from '../../components/clock/clock.component'
import { Typography } from '../../components/typography/typography.component'
import { CheckInIcon } from '../../icons/check-in-icon/check-in.icon'
import { CheckOutIcon } from '../../icons/check-out-icon/check-out.icon'
import AuthenticatedLayout from '../../layouts/authenticated-layout/authenticated.layout'
import { AttendanceCheckScreenController } from './attendance-check-screen.controller'
import useAttendanceCheckStyle from './attendance-check.style'
import { PasswordBottomSheet } from './password-bottom-sheet.component'

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
              <View>
                <Typography variant="h2">
                  Registro de Asistencia
                </Typography>
              </View>

              <View style={styles.checkInContainer}>
                <View style={buttonWrapperStyles}>
                  <TouchableOpacity
                    style={buttonStyles}
                    onPress={controller.handleCheckIn}
                    disabled={controller.isButtonDisabled}
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
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.bottomCard}>
                <Clock 
                  style={styles.timeContainer}
                  hourStyle={styles.hour}
                  dateStyle={styles.date}
                />
                <Typography variant="body" style={styles.dateShift}>
                  {controller.shiftDate}
                </Typography>
              </View>

              {/* Indicadores */}
              <View style={styles.indicatorsContainer}>
                <View style={[ styles.indicator, controller.checkInTime && styles.indicatorActive ]}>
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
                </View>
                <View style={[ styles.indicator, controller.checkInTime && styles.indicatorActive ]}>
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
                </View>
                <View style={[ styles.indicator, controller.checkInTime && styles.indicatorActive ]}>
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
                </View>
                <View style={[ styles.indicator, controller.checkInTime && styles.indicatorActive ]}>
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
                </View>
              </View>
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
