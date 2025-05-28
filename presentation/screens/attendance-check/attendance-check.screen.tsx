import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import AuthenticatedLayout from '../../layouts/authenticated-layout/authenticated.layout'
import { CheckInIcon } from '../../icons/check-in-icon/check-in.icon'
import { CheckOutIcon } from '../../icons/check-out-icon/check-out.icon'
import useAttendanceCheckStyle from './attendance-check.style'
import { AttendanceCheckScreenController } from './attendance-check-screen.controller'
import Clock from '../../components/clock/clock.component'

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
        <ImageBackground
          source={require('../../../assets/images/background-attendance.jpg')}
          style={styles.backgroundImage}
          imageStyle={{ opacity: controller.themeType === 'dark' ? 0 : 0.8 }}
        >
          <SafeAreaView style={styles.container}>
            <StatusBar style={controller.themeType === 'dark' ? 'light' : 'dark'} />
            <View style={styles.checkInContainer}>
              <View
                style={[ styles.checkInButtonWrapper, controller.isButtonLocked && styles.checkInButtonWrapperLocked ]}
              >
                <TouchableOpacity
                  style={[ styles.checkInButton, controller.isButtonLocked && styles.checkInButtonLocked ]}
                  onPress={controller.handleCheckIn}
                  disabled={controller.isButtonLocked}
                >
                  <CheckInIcon
                    size={48}
                    color={ controller.isButtonLocked ? styles.checkButtonIconLocked.color : styles.checkButtonIcon.color }
                  />
                  <Text
                    style={[
                      styles.checkInText,
                      controller.isButtonLocked && styles.checkInTextLocked
                    ]}
                  >
                    {controller.isButtonLocked ? '---' : 'Iniciar Turno'}
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
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>
    </AuthenticatedLayout>
  )
}
