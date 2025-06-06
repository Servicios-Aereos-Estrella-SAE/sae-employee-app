import React from 'react'
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

/**
 * Pantalla para registro de asistencia
 * @returns {React.FC} 
 */
export const AttendanceCheckScreen: React.FC = () => {
  const controller = AttendanceCheckScreenController()
  const styles = useAttendanceCheckStyle()

  return (
    <AuthenticatedLayout>
      <View style={styles.backgroundWrapper}>
        <SafeAreaView style={styles.container}>
          <StatusBar style={controller.themeType === 'dark' ? 'light' : 'dark'} />
          <View style={styles.checkInContainer}>
            <View
              style={[ styles.checkInButtonWrapper, (controller.isButtonLocked || controller.isLoadingLocation) && styles.checkInButtonWrapperLocked ]}
            >
              <TouchableOpacity
                style={[ styles.checkInButton, (controller.isButtonLocked || controller.isLoadingLocation) && styles.checkInButtonLocked ]}
                onPress={controller.handleCheckIn}
                disabled={controller.isButtonLocked || controller.isLoadingLocation}
              >
                {controller.isLoadingLocation ? (
                  <ActivityIndicator 
                    size={48} 
                    color={styles.checkButtonIcon.color} 
                  />
                ) : (
                  <CheckInIcon
                    size={48}
                    color={ (controller.isButtonLocked || controller.isLoadingLocation) ? styles.checkButtonIconLocked.color : styles.checkButtonIcon.color }
                  />
                )}
                <Text
                  style={[
                    styles.checkInText,
                    (controller.isButtonLocked || controller.isLoadingLocation) && styles.checkInTextLocked
                  ]}
                >
                  {controller.isLoadingLocation 
                    ? '...' 
                    : controller.isButtonLocked 
                      ? '---' 
                      : 'Iniciar Turno'}
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
              {controller.currentLocation ? (
                <View>
                  <Text style={styles.locationCoordinates}>
                    {controller.formatCoordinates(controller.currentLocation)}
                  </Text>
                  <Text style={styles.locationAccuracy}>
                    Precisión: {controller.formatAccuracy(controller.currentLocation)}
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
    </AuthenticatedLayout>
  )
}
