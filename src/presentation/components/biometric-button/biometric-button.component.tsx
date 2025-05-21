import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { IBiometricButtonProps } from './types/biometric-button-props.interface'
import useBiometricButtonStyles from './biometric-button.style'
import { useTranslation } from 'react-i18next'
import BiometricButtonController from './biometric-button.controller'

export const BiometricButton: React.FC<IBiometricButtonProps> = ({
  onPress,
  type,
  disabled = false
}) => {
  const { t } = useTranslation()
  const controller = BiometricButtonController()
  const styles = useBiometricButtonStyles({ disabled })

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => controller.biometricTapHandler(onPress)}
        disabled={disabled}
        style={[styles.button]}
      >
        <Icon
          name={type === 'fingerprint' ? 'fingerprint' : 'face-recognition'}
          size={36}
          color={styles.iconButton.color}
        />
      </TouchableOpacity>
      <Text style={styles.text}>{t('components.biometricButton.label')}</Text>
    </View>
  )
}
