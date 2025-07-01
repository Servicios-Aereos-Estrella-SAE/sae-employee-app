import React from 'react'
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar as RNStatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native'
import { Divider, Snackbar } from 'react-native-paper'

import { StatusBar } from 'expo-status-bar'
import { useTranslation } from 'react-i18next'

import { BiometricButton } from '../../components/biometric-button/biometric-button.component'
import { Button } from '../../components/button/button.component'
import { TextInput } from '../../components/text-input/text-input.component'
import { Typography } from '../../components/typography/typography.component'

import { AuthenticationScreenController } from './authentication-screen.controller'
import useAuthenticationStyle from './authentication.style'

/**
 * @description AuthenticationScreen es la pantalla que permite al usuario autenticarse con correo electrónico y contraseña
 * @returns {React.FC}
 */
export const AuthenticationScreen: React.FC = () => {
  const controller = AuthenticationScreenController()
  const style = useAuthenticationStyle()
  const { t } = useTranslation()

  React.useEffect(() => {
    if (Platform.OS === 'ios') {
      RNStatusBar.setBarStyle('light-content', true)
    }
  }, [])

  return (
    <View style={[style.container]}>
      <StatusBar style="light" translucent={true} />

      <Image
        source={require('../../../assets/app-headbanner-2.png')}
        style={style.logoImage}
      />

      <SafeAreaView style={[style.safeAreaContent]}>
        <KeyboardAvoidingView
          style={style.flexContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 50}
        >
          <ScrollView
            contentContainerStyle={style.scrollContent}
            showsVerticalScrollIndicator={false}
            bounces={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={style.formContainer}>
              <Typography variant="h1" style={[style.title]}>
                {controller.getWelcomeTitle()}
              </Typography>

              <TextInput
                label={t('screens.authentication.email')}
                value={controller.email || ''}
                onChangeText={(text) => controller.setEmail?.(text)}
                keyboardType="email-address"
                leftIcon="account"
              />

              <TextInput
                label={t('screens.authentication.password')}
                value={controller.password || ''}
                onChangeText={(text) => controller.setPassword?.(text)}
                secureTextEntry
                leftIcon="lock"
                rightIcon="eye"
              />

              <View style={style.forgotContainer}>
                <TouchableOpacity>
                  <Typography variant="body2" style={[style.forgotText]}>
                    {t('screens.authentication.forgotPassword')}
                  </Typography>
                </TouchableOpacity>
              </View>

              <Button
                title={t('screens.authentication.loginButton')}
                onPress={() => controller.loginHandler?.('email')}
                loading={Boolean(controller.loginButtonLoading)}
              />

              {controller.shouldShowBiometrics() && (
                <View style={style.biometricContainer}>
                  <View style={style.dividerContainer}>
                    <Divider style={[style.divider]} />
                    <Typography variant="body2" style={[style.orText]}>
                      {t('screens.authentication.or')}
                    </Typography>
                    <Divider style={[style.divider]} />
                  </View>
                  <BiometricButton
                    type={controller.biometricType || 'fingerprint'}
                    onPress={() => controller.loginHandler?.('biometric')}
                    disabled={Boolean(controller.loginButtonLoading)}
                  />
                </View>
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        <Typography variant="caption" style={{ textAlign: 'center', color: 'rgb(176, 176, 176)', marginBottom: 40 }}>
          API: {controller.settedAPIUrl}
        </Typography>

        <Snackbar
          visible={!!controller.securityAlert}
          onDismiss={() => controller.setSecurityAlert(null)}
          duration={3000}
          style={style.securityAlert}
        >
          {controller.securityAlert}
        </Snackbar>
      </SafeAreaView>
    </View>
  )
}

export default AuthenticationScreen
