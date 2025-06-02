import React from 'react'
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'
import { BiometricsConfigScreenController } from './biometrics-config-screen.controller'
import { Button } from '../../components/button/button.component'
import { FingerprintIcon } from '../../icons/fingerprint-icon/fingerprint.icon'
import { CogIcon } from '../../icons/cog-icon/cog.icon'

// Obtener dimensiones de la pantalla
const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

// Funciones helper para calcular dimensiones responsivas
const hp = (percentage: number) => (screenHeight * percentage) / 100
const wp = (percentage: number) => (screenWidth * percentage) / 100
const fp = (percentage: number) => ((screenHeight + screenWidth) * percentage) / 200

/**
 * Pantalla de configuración de biometría
 * Esta pantalla se muestra después del primer inicio de sesión para permitir al usuario habilitar la biometría
 * @returns {React.ReactElement} Componente de pantalla de configuración de biometría
 */
const BiometricsConfigScreen = (): React.ReactElement => {
  const { t } = useTranslation()
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
                <FingerprintIcon size={hp(5.5)} color="#89a4bf" />
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
                <CogIcon size={hp(5.5)} color="#89a4bf" />
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
                <Ionicons name="warning" size={hp(7.5)} color="#FF9500" />
              </View>
              <Text style={styles.optionTitle}>{t('screens.biometrics.notSupported')}</Text>
              <Text style={styles.optionDescription}>
                {t('screens.biometrics.deviceNotSupported')}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.actionsContainer}>
          {biometricAvailable ? (
            <Button
              title={`${t('screens.biometrics.enableButton')} ${biometricTextInfo.title}`}
              onPress={enableBiometrics}
              loading={loading}
            />
          ) : (
            <Button
              title={t('screens.biometrics.enableButton')}
              onPress={() => {}}
              disabled={true}
            />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: hp(3.75)
  },
  content: {
    flex: 1,
    padding: wp(5),
    justifyContent: 'space-between'
  },
  header: {
    marginTop: hp(5),
    marginBottom: hp(3.75)
  },
  title: {
    fontSize: fp(3.5),
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: hp(1.25)
  },
  subtitle: {
    fontSize: fp(2),
    color: '#666666',
    lineHeight: hp(2.75)
  },
  biometricOptions: {
    flex: 1,
    justifyContent: 'center'
  },
  biometricOption: {
    alignItems: 'center',
    marginBottom: hp(3.75)
  },
  iconContainer: {
    width: wp(25),
    height: wp(25),
    borderRadius: wp(12.5),
    backgroundColor: '#f6fdfb',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(1.875)
  },
  optionTitle: {
    fontSize: fp(2.25),
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: hp(0.625)
  },
  optionDescription: {
    fontSize: fp(1.75),
    color: '#666666',
    textAlign: 'center',
    paddingHorizontal: wp(5)
  },
  actionsContainer: {
    marginTop: hp(5)
  },
  secondaryButtonWrapper: {
    marginTop: hp(1.25),
    marginBottom: hp(6.25)
  }
})

export { BiometricsConfigScreen }
