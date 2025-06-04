import { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../navigation/types/types'
import { useAppTheme } from '../../theme/theme-context'
import { EThemeType } from '../../theme/types/theme-type.enum'
import i18next from 'i18next'

// Interface for available languages
interface LanguageOption {
  code: string
  name: string
  nativeName: string
}

/**
 * Controlador de la pantalla de configuración
 * @description Gestiona la lógica de negocio para las opciones de configuración de la aplicación
 * @returns {Object} Objeto con los datos y funciones accesibles desde la pantalla de configuración
 */
export const SettingsScreenController = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>('es')
  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState<boolean>(false)
  
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const { themeType, toggleTheme } = useAppTheme()

  // Available languages list
  const availableLanguages: LanguageOption[] = [
    {
      code: 'es',
      name: 'Español',
      nativeName: 'Español'
    },
    {
      code: 'en',
      name: 'English',
      nativeName: 'English'
    }
  ]

  useEffect(() => {
    // Obtener el idioma actual de i18next
    setCurrentLanguage(i18next.language)
  }, [])

  /**
   * Navega a la pantalla de configuración de biometría
   * @returns {void}
   */
  const navigateToBiometrics = (): void => {
    navigation.navigate('biometricsConfigScreen')
  }

  /**
   * Muestra el modal de selección de idioma
   * @returns {void}
   */
  const showLanguageModal = (): void => {
    setIsLanguageModalVisible(true)
  }

  /**
   * Oculta el modal de selección de idioma
   * @returns {void}
   */
  const hideLanguageModal = (): void => {
    setIsLanguageModalVisible(false)
  }

  /**
   * Cambia el idioma de la aplicación
   * @param {string} languageCode - Código del idioma a establecer
   * @returns {Promise<void>}
   */
  const changeLanguage = async (languageCode: string): Promise<void> => {
    try {
      await i18next.changeLanguage(languageCode)
      setCurrentLanguage(languageCode)
      hideLanguageModal()
    } catch (error) {
      console.error('Error cambiando idioma:', error)
    }
  }

  /**
   * Alterna entre los idiomas disponibles (español e inglés) - Función legacy mantenida para compatibilidad
   * @returns {Promise<void>}
   * @deprecated Use showLanguageModal() instead
   */
  const toggleLanguage = async (): Promise<void> => {
    showLanguageModal()
  }

  /**
   * Obtiene el tipo de tema actual como string
   * @returns {string} El tipo de tema actual ('light' o 'dark')
   */
  const getThemeType = (): string => {
    return themeType === EThemeType.LIGHT ? 'light' : 'dark'
  }

  /**
   * Obtiene el nombre del idioma actual para mostrar en la UI
   * @returns {string} Nombre del idioma actual
   */
  const getCurrentLanguageName = (): string => {
    const currentLang = availableLanguages.find(lang => lang.code === currentLanguage)
    return currentLang?.nativeName || 'Español'
  }

  return {
    // Estado
    currentLanguage,
    themeType: getThemeType(),
    isLanguageModalVisible,
    availableLanguages,
    
    // Funciones
    navigateToBiometrics,
    toggleTheme,
    toggleLanguage, // Mantenida por compatibilidad, ahora abre el modal
    showLanguageModal,
    hideLanguageModal,
    changeLanguage,
    getCurrentLanguageName
  }
} 
