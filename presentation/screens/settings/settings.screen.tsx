import React from 'react'
import {
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal
} from 'react-native'
import { Text } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { StatusBar } from 'expo-status-bar'
import { useTranslation } from 'react-i18next'

import AuthenticatedLayout from '../../layouts/authenticated-layout/authenticated.layout'
import { SettingsScreenController } from './settings-screen.controller'
import useSettingsStyle from './settings.style'
import { ThemeIcon } from '../../icons/theme-icon/theme.icon'
import { FingerprintIcon } from '../../icons/fingerprint-icon/fingerprint.icon'
import { TranslateIcon } from '../../icons/translate-icon/translate.icon'

/**
 * @description SettingsScreen es la pantalla que permite al usuario gestionar la configuración de la aplicación
 * @returns {React.FC}
 */
export const SettingsScreen: React.FC = () => {
  const controller = SettingsScreenController()
  const style = useSettingsStyle()
  const { t } = useTranslation()

  return (
    <AuthenticatedLayout>
      <View style={style.container}>
        <StatusBar style="auto" />
        
        <SafeAreaView style={style.safeAreaContent}>
          <ScrollView
            contentContainerStyle={style.scrollContent}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <View style={style.header}>
              <Text style={style.title}>
                {t('screens.settings.title')}
              </Text>
              <Text style={style.subtitle}>
                {t('screens.settings.subtitle')}
              </Text>
            </View>

            <View style={style.optionsContainer}>
              {/* Opción de Configuración de Biometría */}
              <TouchableOpacity
                style={style.optionCard}
                onPress={controller.navigateToBiometrics}
                activeOpacity={0.7}
              >
                <View style={style.optionLeft}>
                  <View style={[style.iconContainer]}>
                    <FingerprintIcon color={style.iconColor.color} />
                  </View>
                  <View style={style.optionContent}>
                    <Text style={style.optionTitle}>
                      {t('screens.settings.biometricsOption.title')}
                    </Text>
                    <Text style={style.optionDescription}>
                      {t('screens.settings.biometricsOption.description')}
                    </Text>
                  </View>
                </View>
                <Icon 
                  name="chevron-right" 
                  size={24} 
                  color={style.chevronColor.color} 
                />
              </TouchableOpacity>

              {/* Opción de Tema */}
              <TouchableOpacity
                style={style.optionCard}
                onPress={controller.toggleTheme}
                activeOpacity={0.7}
              >
                <View style={style.optionLeft}>
                  <View style={[style.iconContainer]}>
                    <ThemeIcon
                      color={style.iconColor.color}
                      isDark={controller.themeType === 'dark'}
                    />
                  </View>
                  <View style={style.optionContent}>
                    <Text style={style.optionTitle}>
                      {t('screens.settings.themeOption.title')}
                    </Text>
                    <Text style={style.optionDescription}>
                      {t('screens.settings.themeOption.description')}
                    </Text>
                    <Text style={style.currentValue}>
                      {controller.themeType === 'light' 
                        ? t('screens.settings.themeOption.lightTheme')
                        : t('screens.settings.themeOption.darkTheme')
                      }
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Opción de Idioma */}
              <TouchableOpacity
                style={style.optionCard}
                onPress={controller.showLanguageModal}
                activeOpacity={0.7}
              >
                <View style={style.optionLeft}>
                  <View style={[style.iconContainer]}>
                    <TranslateIcon color={style.iconColor.color} />
                  </View>
                  <View style={style.optionContent}>
                    <Text style={style.optionTitle}>
                      {t('screens.settings.languageOption.title')}
                    </Text>
                    <Text style={style.optionDescription}>
                      {t('screens.settings.languageOption.description')}
                    </Text>
                    <Text style={style.currentValue}>
                      {controller.getCurrentLanguageName()}
                    </Text>
                  </View>
                </View>
                <Icon 
                  name="chevron-right" 
                  size={24} 
                  color={style.chevronColor.color} 
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>

        {/* Modal de Selección de Idioma */}
        <Modal
          visible={controller.isLanguageModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={controller.hideLanguageModal}
        >
          <TouchableOpacity 
            style={style.modalOverlay}
            activeOpacity={1}
            onPress={controller.hideLanguageModal}
          >
            <TouchableOpacity 
              style={style.languageModalContainer}
              activeOpacity={1}
              onPress={() => {}} // Prevenir cierre al tocar el modal
            >
              <View style={style.modalHeader}>
                <Text style={style.modalTitle}>
                  {t('screens.settings.languageOption.modal.title')}
                </Text>
                <Text style={style.modalSubtitle}>
                  {t('screens.settings.languageOption.modal.subtitle')}
                </Text>
              </View>

              <View style={style.languagesList}>
                {controller.availableLanguages.map((language) => (
                  <TouchableOpacity
                    key={language.code}
                    style={[
                      style.languageOption,
                      controller.currentLanguage === language.code && style.languageOptionSelected
                    ]}
                    onPress={() => controller.changeLanguage(language.code)}
                    activeOpacity={0.7}
                  >
                    <View style={style.languageOptionContent}>
                      <View style={style.languageFlag}>
                        <Icon 
                          name="web" 
                          size={14} 
                          color={style.iconColor.color} 
                        />
                      </View>
                      <Text 
                        style={[
                          style.languageText,
                          controller.currentLanguage === language.code && style.languageTextSelected
                        ]}
                      >
                        {language.nativeName}
                      </Text>
                    </View>
                    {controller.currentLanguage === language.code && (
                      <Icon 
                        name="check-circle" 
                        size={20} 
                        color={style.iconColor.color} 
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>

              <View style={style.modalActions}>
                <TouchableOpacity
                  style={style.modalCancelButton}
                  onPress={controller.hideLanguageModal}
                  activeOpacity={0.7}
                >
                  <Text style={style.modalCancelText}>
                    {t('common.cancel')}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </View>
    </AuthenticatedLayout>
  )
}

export default SettingsScreen 
