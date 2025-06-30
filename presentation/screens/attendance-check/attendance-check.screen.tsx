import React, { useMemo } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import AuthenticatedLayout from '../../layouts/authenticated-layout/authenticated.layout'
import { CheckInIcon } from '../../icons/check-in-icon/check-in.icon'
import { CheckOutIcon } from '../../icons/check-out-icon/check-out.icon'
import useAttendanceCheckStyle from './attendance-check.style'
import { AttendanceCheckScreenController } from './attendance-check-screen.controller'
import { Clock } from '../../components/clock/clock.component'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import BottomSheet from '@gorhom/bottom-sheet'
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
            <StatusBar style={controller.themeType === 'dark' ? 'light' : 'dark'} />
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
                  <Text style={buttonTextStyles}>
                    {controller.buttonText}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Contenido inferior en fondo blanco */}
            <View style={styles.bottomCard}>
              <Clock 
                style={styles.timeContainer}
                hourStyle={styles.hour}
                dateStyle={styles.date}
              />
              
              {/* Indicadores */}
              <View style={styles.indicatorsContainer}>
                <View style={[ styles.indicator, controller.checkInTime && styles.indicatorActive ]}>
                  <CheckOutIcon
                    size={24}
                    color={ styles.checkIconIndicator.color }
                  />
                  <Text style={[ styles.indicatorLabel, controller.checkInTime && styles.indicatorLabelActive ]}>
                    Entrada
                  </Text>
                  <Text style={[ styles.indicatorValue, controller.checkInTime && styles.indicatorValueActive ]}>
                    {controller.checkInTime || '--:--'}
                  </Text>
                </View>
                <View style={[ styles.indicator, controller.checkInTime && styles.indicatorActive ]}>
                  <CheckOutIcon
                    size={24}
                    color={ styles.checkIconIndicator.color }
                  />
                  <Text style={[ styles.indicatorLabel, controller.checkInTime && styles.indicatorLabelActive ]}>
                    Iniciar Comida
                  </Text>
                  <Text style={[ styles.indicatorValue, controller.checkInTime && styles.indicatorValueActive ]}>
                    --:--:--
                  </Text>
                </View>
                <View style={[ styles.indicator, controller.checkInTime && styles.indicatorActive ]}>
                  <CheckOutIcon
                    size={24}
                    color={ styles.checkIconIndicator.color }
                  />
                  <Text style={[ styles.indicatorLabel, controller.checkInTime && styles.indicatorLabelActive ]}>
                    Terminar Comida
                  </Text>
                  <Text style={[ styles.indicatorValue, controller.checkInTime && styles.indicatorValueActive ]}>
                    --:--:--
                  </Text>
                </View>
                <View style={[ styles.indicator, controller.checkInTime && styles.indicatorActive ]}>
                  <CheckOutIcon
                    size={24}
                    color={ styles.checkIconIndicator.color }
                  />
                  <Text style={[ styles.indicatorLabel, controller.checkInTime && styles.indicatorLabelActive ]}>
                    Salida
                  </Text>
                  <Text style={[ styles.indicatorValue, controller.checkInTime && styles.indicatorValueActive ]}>
                    --:--:--
                  </Text>
                </View>
              </View>

              {/* Información de ubicación */}
              <View style={styles.locationContainer}>
                <Text style={styles.locationTitle}>Ubicación</Text>
                {controller.locationContent ? (
                  <View>
                    <Text style={styles.locationCoordinates}>
                      {controller.locationContent.coordinates}
                    </Text>
                    <Text style={styles.locationAccuracy}>
                      Precisión: {controller.locationContent.accuracy}
                    </Text>
                  </View>
                ) : (
                  <Text style={styles.locationPlaceholder}>
                    {controller.isLoadingLocation ? 'Obteniendo ubicación...' : 'Ubicación no disponible'}
                  </Text>
                )}
              </View>
            </View>
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
