import React from 'react'
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Svg, { Path } from 'react-native-svg'
import { useTranslation } from 'react-i18next'
import { BiometricsConfigScreenController } from './biometrics-config-screen.controller'
import { Button } from '../../components/button/button.component'

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
                <Svg width={hp(7.5)} height={hp(7.5)} viewBox="0 0 24 24" fill="none">
                  <Path d="M14.976 11.975c.596.607.93 1.332 1.168 2.324l.115.53.096.509c.124.667.198.972.308 1.215.285.636.794 1.294 1.535 1.97.407.37.435.998.061 1.402a1.005 1.005 0 0 1-1.413.061c-.93-.847-1.604-1.719-2.01-2.623-.157-.35-.252-.677-.361-1.216l-.189-.99-.035-.167c-.171-.802-.378-1.293-.707-1.627-.599-.61-2.052-.44-2.406.117-.521.818-.658 2.241-.232 3.685.34 1.151.792 2.285 1.355 3.4a.99.99 0 0 1-.445 1.333 1.003 1.003 0 0 1-1.342-.442 22.253 22.253 0 0 1-1.487-3.731c-.58-1.964-.387-3.976.46-5.306 1.04-1.63 4.02-1.979 5.529-.444ZM12.473 14.1a1 1 0 0 1 1.032.966 7.676 7.676 0 0 0 1.4 4.168l.19.259.3.39a1 1 0 0 1-1.503 1.314l-.082-.095-.3-.39a9.676 9.676 0 0 1-2.003-5.58 1 1 0 0 1 .966-1.032Zm-3.9-4.912c2.201-1.63 5.076-1.541 7.017-.294.961.618 1.693 1.343 2.183 2.178a1 1 0 1 1-1.726 1.011c-.32-.547-.829-1.05-1.539-1.506-1.28-.823-3.256-.884-4.745.219-1.56 1.154-2.22 3.146-2.023 5.257.113 1.195.473 2.406 1.088 3.635a1 1 0 0 1-1.788.895c-.723-1.445-1.155-2.894-1.29-4.343-.259-2.75.631-5.429 2.823-7.052Zm10.573 5.16c.03.56.165 1.01.401 1.367.222.337.399.496.488.523a1 1 0 1 1-.579 1.915c-.612-.186-1.124-.646-1.579-1.337-.441-.67-.681-1.464-.728-2.366a1 1 0 1 1 1.997-.103Zm-8.68-8.395a1 1 0 0 1-.502 1.322c-1.794.808-3.108 1.953-3.97 3.446-1.083 1.874-1.376 4.074-1.133 5.923a1 1 0 1 1-1.983.26c-.295-2.251.055-4.883 1.384-7.183 1.079-1.868 2.715-3.295 4.88-4.27a1 1 0 0 1 1.323.502Zm2.463-1.032c1.895.039 3.77.905 5.62 2.55 1.869 1.663 2.995 3.923 3.375 6.733a1 1 0 0 1-1.982.268c-.319-2.354-1.226-4.175-2.723-5.507-1.518-1.35-2.96-2.016-4.332-2.044a1 1 0 1 1 .041-2Zm-7.318.23a1 1 0 0 1-.082 1.412c-.26.232-.535.51-.822.834A7.218 7.218 0 0 0 3.89 8.57a1 1 0 0 1-1.732-1A9.157 9.157 0 0 1 3.21 6.07c.338-.38.667-.714.989-1a1 1 0 0 1 1.412.081Zm6.885-3.134c2.242.105 4.321.595 5.865 1.787a1 1 0 1 1-1.223 1.582c-1.203-.928-2.887-1.285-4.735-1.371-1.856-.087-3.366.242-4.552.97a1 1 0 0 1-1.046-1.704c1.552-.953 3.457-1.369 5.691-1.264Z" fill="#89a4bf" />
                </Svg>
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
                <Ionicons name="settings-outline" size={hp(7.5)} color="#FF9500" />
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
              mode="contained"
            />
          ) : (
            <Button
              title={t('screens.biometrics.enableButton')}
              onPress={() => {}}
              disabled={true}
              mode="contained"
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
