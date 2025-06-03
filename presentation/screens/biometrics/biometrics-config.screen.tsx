import React from 'react'
import {
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
import AuthenticatedLayout from '../../layouts/authenticated-layout/authenticated.layout'
import { CheckIcon } from '../../icons/check-icon/check.icon'

/**
 * Pantalla de configuración de biometría
 * Esta pantalla se muestra después del primer inicio de sesión para permitir al usuario habilitar la biometría
 * @returns {React.ReactElement} Componente de pantalla de configuración de biometría
 */
const BiometricsConfigScreen = (): React.ReactElement => {
  const { t } = useTranslation()
  const styles = useBiometricsConfigScreenStyle()
  const controller = BiometricsConfigScreenController()

  return (
    <AuthenticatedLayout>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{t('screens.biometrics.title')}</Text>
            <Text style={styles.subtitle}>{t('screens.biometrics.subtitle')}</Text>
          </View>

          <View style={styles.biometricOptions}>

            {controller.deviceBiometricSupport ? (
              <View>
                {controller.biometricsEnabled ? (
                  // La biometría está habilitada en el estado de autenticación
                  <View style={styles.biometricOption}>
                    <View style={styles.iconContainer}>
                      <CheckIcon size={styles.likeIcon.height} color={styles.likeIcon.color} />
                    </View>
                    <Text style={styles.optionDescription}>
                      {t('screens.biometrics.biometricsEnabled')}
                    </Text>
                  </View>
                ) : (
                  // El dispositivo si soporta algún tipo de biométrico
                  <View>
                    {!controller.biometricAvailable && (controller.deviceSupportsFace || controller.deviceSupportsFingerprint) && (
                    // El dispositivo soporta biométrico pero no está configurado en las configuraciones del dispositivo
                      <View style={styles.biometricOption}>
                        <View style={styles.iconContainer}>
                          <CogIcon size={styles.cogIcon.height} color={styles.iconButton.color} />
                        </View>
                        <Text style={styles.optionTitle}>{t('screens.biometrics.notConfigured')}</Text>
                        <Text style={styles.optionDescription}>
                          {t('screens.biometrics.deviceSupportsButNotConfigured')}
                        </Text>
                      </View>
                    )}

                    {controller.biometricAvailable && (
                    // El dispositivo tiene biométrico disponible
                      <View style={styles.biometricOption}>
                        <View style={styles.iconContainer}>
                          <FingerprintIcon size={styles.fingerprintIcon.height} color={styles.iconButton.color} />
                        </View>
                        <Text style={styles.optionTitle}>
                          {controller.biometricTextInfo.title}
                          <Text style={styles.optionTitle}>
                            {controller.biometricTextInfo.title}
                          </Text>
                        </Text>
                        <Text style={styles.optionDescription}>
                          {controller.biometricTextInfo.description}
                        </Text>
                      </View>
                    )}
                  </View>
                )}
              </View>
            ) : (
              // Si el dispositivo no soporta ningún biométrico
              <View style={styles.biometricOption}>
                <View style={styles.iconContainer}>
                  <WarningIcon size={styles.warningIcon.height} color={styles.warningIcon.color} />
                </View>
                <Text style={styles.optionTitle}>{t('screens.biometrics.notSupported')}</Text>
                <Text style={styles.optionDescription}>
                  {t('screens.biometrics.deviceNotSupported')}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.actionsContainer}>
            {controller.biometricAvailable && controller.deviceBiometricSupport && !controller.biometricsEnabled ? (
              // El dispositivo tiene biométrico disponible y soporta algún tipo de biométrico
              <Button
                title={`${t('screens.biometrics.enableButton')} ${controller.biometricTextInfo.title}`}
                onPress={controller.enableBiometrics}
                loading={controller.loading}
              />
            ) : (
              <View></View>
            )}

            {!controller.biometricsEnabled && (
              <View style={styles.secondaryButtonWrapper}>
                <Button
                  title={t('screens.biometrics.skipButton')}
                  onPress={controller.skipBiometricsSetup}
                  loading={controller.loading}
                  mode="outlined"
                />
              </View>
            )}

            {controller.biometricsEnabled && (
              // La biometría está habilitada en el estado de autenticación
              <View style={styles.secondaryButtonWrapper}>
                <Button
                  title={t('screens.biometrics.unsetBiometricsButton')}
                  onPress={controller.unsetBiometrics}
                  loading={controller.loading}
                  mode="outlined"
                />
              </View>
            )}
          </View>
        </View>
      </View>
    </AuthenticatedLayout>
  )
}

export { BiometricsConfigScreen }
