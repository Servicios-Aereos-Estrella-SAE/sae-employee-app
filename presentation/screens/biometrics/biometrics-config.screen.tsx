import React from 'react'
import {
  SafeAreaView,
  View,
  Text
} from 'react-native'
import { useTranslation } from 'react-i18next'
import { BiometricsConfigScreenController } from './biometrics-config-screen.controller'
import { Button } from '../../components/button/button.component'
import { FingerprintIcon } from '../../icons/fingerprint-icon/fingerprint.icon'
import { CogIcon } from '../../icons/cog-icon/cog.icon'
import { useBiometricsConfigScreenStyle } from './biometrics-config-screen.style'
import { WarningIcon } from '../../icons/warning-icon/warning.icon'

/**
 * Pantalla de configuración de biometría
 * Esta pantalla se muestra después del primer inicio de sesión para permitir al usuario habilitar la biometría
 * @returns {React.ReactElement} Componente de pantalla de configuración de biometría
 */
const BiometricsConfigScreen = (): React.ReactElement => {
  const { t } = useTranslation()
  const styles = useBiometricsConfigScreenStyle()
  const {
    loading,
    biometricType,
    biometricAvailable,
    // Soporte de hardware
    deviceSupportsFace,
    deviceSupportsFingerprint,
    // Biométricos registrados
    hasEnrolledFaceID,
    hasEnrolledFingerprint,
    // Acciones
    enableBiometrics,
    skipBiometricsSetup
  } = BiometricsConfigScreenController()

  // Función para obtener texto apropiado basado en el tipo de biometría
  const getBiometricText = () => {
    if (hasEnrolledFaceID && !hasEnrolledFingerprint) {
      return {
        title: t('screens.biometrics.faceID'),
        description: t('screens.biometrics.faceIDAvailable'),
        icon: 'scan-outline'
      }
    } else if (hasEnrolledFingerprint && !hasEnrolledFaceID) {
      return {
        title: t('screens.biometrics.fingerprint'),
        description: t('screens.biometrics.fingerprintAvailable'),
        icon: 'finger-print'
      }
    } else if (biometricType === 'face') {
      return {
        title: t('screens.biometrics.faceID'),
        description: t('screens.biometrics.primaryBiometricMethod'),
        icon: 'scan-outline'
      }
    } else {
      return {
        title: t('screens.biometrics.fingerprint'),
        description: t('screens.biometrics.primaryBiometricMethod'),
        icon: 'finger-print'
      }
    }
  }

  const biometricTextInfo = getBiometricText()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('screens.biometrics.title')}</Text>
          <Text style={styles.subtitle}>{t('screens.biometrics.subtitle')}</Text>
        </View>

        <View style={styles.biometricOptions}>
          {/* Mostrar el método biométrico principal que se utilizará */}
          {biometricAvailable && (
            <View style={styles.biometricOption}>
              <View style={styles.iconContainer}>
                <FingerprintIcon size={styles.fingerprintIcon.height} color="#89a4bf" />
              </View>
              <Text style={styles.optionTitle}>{biometricTextInfo.title}</Text>
              <Text style={styles.optionDescription}>
                {biometricTextInfo.description}
              </Text>
            </View>
          )}

          {/* Si no hay biométricos registrados pero el dispositivo los soporta, mostrar mensaje de configuración */}
          {!biometricAvailable && (deviceSupportsFace || deviceSupportsFingerprint) && (
            <View style={styles.biometricOption}>
              <View style={styles.iconContainer}>
                <CogIcon size={styles.cogIcon.height} color="#89a4bf" />
              </View>
              <Text style={styles.optionTitle}>{t('screens.biometrics.notConfigured')}</Text>
              <Text style={styles.optionDescription}>
                {t('screens.biometrics.deviceSupportsButNotConfigured')}
              </Text>
            </View>
          )}

          {/* Si el dispositivo no soporta ningún biométrico */}
          {!deviceSupportsFace && !deviceSupportsFingerprint && (
            <View style={styles.biometricOption}>
              <View style={styles.iconContainer}>
                <WarningIcon size={styles.warningIcon.height} color="#FF993A" />
              </View>
              <Text style={styles.optionTitle}>{t('screens.biometrics.notSupported')}</Text>
              <Text style={styles.optionDescription}>
                {t('screens.biometrics.deviceNotSupported')}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.actionsContainer}>
          {biometricAvailable && (deviceSupportsFace || deviceSupportsFingerprint) ? (
            <Button
              title={`${t('screens.biometrics.enableButton')} ${biometricTextInfo.title}`}
              onPress={enableBiometrics}
              loading={loading}
            />
          ) : (
            <View></View>
          )}

          <View style={styles.secondaryButtonWrapper}>
            <Button
              title={t('screens.biometrics.skipButton')}
              onPress={skipBiometricsSetup}
              loading={loading}
              mode="outlined"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export { BiometricsConfigScreen }
