import BottomSheet from '@gorhom/bottom-sheet'
import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()

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

  // Función para obtener el color del icono según el estatus
  const getIconColor = useCallback((status: string | null) => {
    const statusColor = controller.getStatusColor(status)
    return statusColor || styles.checkIconIndicator.color
  }, [controller.getStatusColor, styles.checkIconIndicator.color])

  // Función para obtener estilos de indicador según el estatus
  const getIndicatorStyles = useCallback((status: string | null, hasTime: boolean) => {
    const statusColor = controller.getStatusColor(status)
    const baseStyles = [
      styles.indicator, 
      // (controller.checkInTime || hasTime) && styles.indicatorActive
      hasTime && styles.indicatorActive
    ]
    
    if (statusColor) {
      return [
        ...baseStyles,
        { borderLeftColor: statusColor, borderLeftWidth: 4 }
      ]
    }
    
    return baseStyles
  }, [controller.getStatusColor, styles.indicator, styles.indicatorActive])

  // Función para obtener estilos de label según el estatus
  const getLabelStyles = useCallback((status: string | null, hasTime: boolean) => {
    const statusColor = controller.getStatusColor(status)
    const baseStyles = [
      styles.indicatorLabel, 
      // (controller.checkInTime || hasTime) && styles.indicatorLabelActive
      hasTime && styles.indicatorLabelActive
    ]
    
    if (statusColor) {
      return [
        ...baseStyles,
        { color: statusColor }
      ]
    }
    
    return baseStyles.filter(Boolean)
  }, [controller.getStatusColor, styles.indicatorLabel, styles.indicatorLabelActive])

  // Función para obtener estilos de valor según el estatus
  const getValueStyles = useCallback((status: string | null, hasTime: boolean) => {
    const statusColor = controller.getStatusColor(status)
    const baseStyles = [
      styles.indicatorValue, 
      // (controller.checkInTime || hasTime) && styles.indicatorValueActive
      hasTime && styles.indicatorValueActive
    ]
    
    if (statusColor) {
      return [
        ...baseStyles,
        { color: statusColor }
      ]
    }
    
    return baseStyles.filter(Boolean)
  }, [controller.getStatusColor, styles.indicatorValue, styles.indicatorValueActive])

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
                  {t('screens.attendanceCheck.title')}
                </Typography>
              </Animated.View>

              {/* Mensaje de error de conexión */}
              {controller.hasConnectionError ? (
                <Animated.View
                  entering={FadeIn.delay(200).duration(400)}
                  style={{ 
                    flex: 1, 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    marginTop: 100 
                  }}
                >
                  <Typography variant="h3" style={{ textAlign: 'center', color: '#666' }}>
                    {t('screens.attendanceCheck.connectionError.title')}
                  </Typography>
                  <Typography variant="body" style={{ textAlign: 'center', color: '#999', marginTop: 8 }}>
                    {t('screens.attendanceCheck.connectionError.message')}
                  </Typography>
                  
                  <TouchableOpacity 
                    onPress={controller.retryLoadData} 
                    disabled={controller.isRetrying}
                    style={{ 
                      marginTop: 20,
                      paddingHorizontal: 16,
                      paddingVertical: 10,
                      backgroundColor: controller.isRetrying ? '#cccccc' : '#007bff',
                      borderRadius: 8,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {controller.isRetrying && (
                      <ActivityIndicator 
                        size="small" 
                        color="#ffffff" 
                        style={{ marginRight: 8 }}
                      />
                    )}
                    <Typography variant="body" style={{ color: '#ffffff', fontWeight: '500' }}>
                      {controller.isRetrying ? t('screens.attendanceCheck.connectionError.retrying') : t('screens.attendanceCheck.connectionError.retryButton')}
                    </Typography>
                  </TouchableOpacity>
                </Animated.View>
              ) : (
                <>
                  {/* Contenido normal cuando hay conexión */}

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
                      style={getIndicatorStyles(controller.attendanceData.checkInStatus, !!controller.attendanceData.checkInTime)}
                    >
                      <CheckOutIcon
                        size={24}
                        color={getIconColor(controller.attendanceData.checkInStatus)}
                      />
                      <Typography variant="body2" style={getLabelStyles(controller.attendanceData.checkInStatus, !!controller.attendanceData.checkInTime) as any}>
                        {t('screens.attendanceCheck.checkTypes.checkIn')}
                      </Typography>
                      <Typography variant="body2" style={getValueStyles(controller.attendanceData.checkInStatus, !!controller.attendanceData.checkInTime) as any}>
                        {controller.attendanceData.checkInTime || t('screens.attendanceCheck.defaultTime')}
                      </Typography>
                    </Animated.View>

                    {/* Iniciar Comida */}
                    <Animated.View 
                      entering={FadeInLeft.delay(650).duration(400)}
                      style={getIndicatorStyles(controller.attendanceData.checkEatInStatus, !!controller.attendanceData.checkEatInTime)}
                    >
                      <CheckOutIcon
                        size={24}
                        color={getIconColor(controller.attendanceData.checkEatInStatus)}
                      />
                      <Typography variant="body2" style={getLabelStyles(controller.attendanceData.checkEatInStatus, !!controller.attendanceData.checkEatInTime) as any}>
                        {t('screens.attendanceCheck.checkTypes.checkEatIn')}
                      </Typography>
                      <Typography variant="body2" style={getValueStyles(controller.attendanceData.checkEatInStatus, !!controller.attendanceData.checkEatInTime) as any}>
                        {controller.attendanceData.checkEatInTime || t('screens.attendanceCheck.defaultTime')}
                      </Typography>
                    </Animated.View>

                    {/* Terminar Comida */}
                    <Animated.View 
                      entering={FadeInLeft.delay(800).duration(400)}
                      style={getIndicatorStyles(controller.attendanceData.checkEatOutStatus, !!controller.attendanceData.checkEatOutTime)}
                    >
                      <CheckOutIcon
                        size={24}
                        color={getIconColor(controller.attendanceData.checkEatOutStatus)}
                      />
                      <Typography variant="body2" style={getLabelStyles(controller.attendanceData.checkEatOutStatus, !!controller.attendanceData.checkEatOutTime) as any}>
                        {t('screens.attendanceCheck.checkTypes.checkEatOut')}
                      </Typography>
                      <Typography variant="body2" style={getValueStyles(controller.attendanceData.checkEatOutStatus, !!controller.attendanceData.checkEatOutTime) as any}>
                        {controller.attendanceData.checkEatOutTime || t('screens.attendanceCheck.defaultTime')}
                      </Typography>
                    </Animated.View>

                    {/* Salida */}
                    <Animated.View 
                      entering={FadeInLeft.delay(950).duration(400)}
                      style={getIndicatorStyles(controller.attendanceData.checkOutStatus, !!controller.attendanceData.checkOutTime)}
                    >
                      <CheckOutIcon
                        size={24}
                        color={getIconColor(controller.attendanceData.checkOutStatus)}
                      />
                      <Typography variant="body2" style={getLabelStyles(controller.attendanceData.checkOutStatus, !!controller.attendanceData.checkOutTime) as any}>
                        {t('screens.attendanceCheck.checkTypes.checkOut')}
                      </Typography>
                      <Typography variant="body2" style={getValueStyles(controller.attendanceData.checkOutStatus, !!controller.attendanceData.checkOutTime) as any}>
                        {controller.attendanceData.checkOutTime || t('screens.attendanceCheck.defaultTime')}
                      </Typography>
                    </Animated.View>
                  </Animated.View>
                </>
              )}
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
