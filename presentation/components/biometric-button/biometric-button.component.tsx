import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity, View } from 'react-native'
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming
} from 'react-native-reanimated'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { BiometricButtonController } from './biometric-button.controller'
import useBiometricButtonStyles from './biometric-button.style'
import { IBiometricButtonProps } from './types/biometric-button-props.interface'

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)
const AnimatedIcon = Animated.createAnimatedComponent(Icon)

/**
 * Botón de biometría
 * @param {IBiometricButtonProps} props - Propiedades del botón de biometría
 * @returns {React.FC} Botón de biometría
 */
export const BiometricButton: React.FC<IBiometricButtonProps> = ({
  onPress,
  type,
  disabled = false
}) => {
  const { t } = useTranslation()
  const controller = BiometricButtonController()
  const styles = useBiometricButtonStyles({ disabled })

  // Valores animados
  const scale = useSharedValue(1)
  const pulseScale = useSharedValue(1)
  const rotation = useSharedValue(0)
  const glowOpacity = useSharedValue(0.3)

  // Efecto de pulso continuo cuando no está deshabilitado
  useEffect(() => {
    if (!disabled) {
      pulseScale.value = withRepeat(
        withTiming(1.1, {
          duration: 1500,
          easing: Easing.inOut(Easing.ease)
        }),
        -1,
        true
      )
      
      glowOpacity.value = withRepeat(
        withTiming(0.8, {
          duration: 2000,
          easing: Easing.inOut(Easing.ease)
        }),
        -1,
        true
      )
    } else {
      pulseScale.value = withTiming(1, { duration: 300 })
      glowOpacity.value = withTiming(0.1, { duration: 300 })
    }
  }, [disabled])

  const handlePress = () => {
    if (!disabled && onPress) {
      // Animación de tap con rotación
      scale.value = withSpring(0.9, {
        duration: 150,
        dampingRatio: 0.6
      })
      
      rotation.value = withSpring(360, {
        duration: 400,
        dampingRatio: 0.7
      }, () => {
        rotation.value = 0
      })

      setTimeout(() => {
        scale.value = withSpring(1, {
          duration: 200,
          dampingRatio: 0.8
        })
        runOnJS(controller.biometricTapHandler)(onPress)
      }, 150)
    }
  }

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    const combinedScale = scale.value * pulseScale.value
    
    return {
      transform: [
        { scale: combinedScale },
        { rotate: `${rotation.value}deg` }
      ]
    }
  })

  const glowAnimatedStyle = useAnimatedStyle(() => {
    const glowScale = interpolate(
      pulseScale.value,
      [1, 1.1],
      [1, 1.3]
    )
    
    return {
      transform: [{ scale: glowScale }],
      opacity: disabled ? 0.1 : glowOpacity.value
    }
  })

  const iconAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value * 0.5}deg` }]
    }
  })

  return (
    <View style={styles.container}>
      <View style={{ position: 'relative' }}>
        {/* Efecto de resplandor */}
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: -10,
              left: -10,
              right: -10,
              bottom: -10,
              borderRadius: 50,
              backgroundColor: styles.iconButton.color,
              opacity: 0.2
            },
            glowAnimatedStyle
          ]}
        />
        
        {/* Botón principal */}
        <AnimatedTouchableOpacity
          onPress={handlePress}
          disabled={disabled}
          style={[styles.button, buttonAnimatedStyle]}
          activeOpacity={1}
        >
          <AnimatedIcon
            name={type === 'fingerprint' ? 'fingerprint' : 'face-recognition'}
            size={36}
            color={styles.iconButton.color}
            style={iconAnimatedStyle}
          />
        </AnimatedTouchableOpacity>
      </View>
      
      <Animated.Text style={styles.text}>
        {t('components.biometricButton.label')}
      </Animated.Text>
    </View>
  )
}
