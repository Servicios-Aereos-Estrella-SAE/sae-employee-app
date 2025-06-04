import { StyleSheet, Dimensions } from 'react-native'
import { useAppTheme } from '../../theme/theme-context'
import { IAppTheme } from '../../theme/app-theme.interface'
import { EThemeType } from '../../theme/types/theme-type.enum'

const { width, height: screenHeight } = Dimensions.get('window')
const hp = (percentage: number) => (screenHeight * percentage) / 100

/**
 * Función que crea los estilos para la pantalla de configuración
 * @param {IAppTheme} theme - Tema actual de la aplicación
 * @param {EThemeType} themeType - Tipo de tema (light o dark)
 * @returns {Object} Estilos de la pantalla de configuración
 */
const createSettingsStyle = (theme: IAppTheme, themeType: EThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingTop: hp(15)
    },
    safeAreaContent: {
      flex: 1,
      backgroundColor: theme.colors.background
    },
    scrollContent: {
      flexGrow: 1,
      paddingBottom: 10
    },
    header: {
      marginBottom: 30,
      marginTop: 20
    },
    title: {
      fontSize: width * 0.06,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 8,
      textAlign: 'center'
    },
    subtitle: {
      fontSize: width * 0.035,
      color: theme.colors.text,
      textAlign: 'center',
      opacity: 0.7
    },
    optionsContainer: {
      flex: 1
    },
    optionCard: {
      backgroundColor: themeType === EThemeType.LIGHT ? '#FFFFFF' : theme.colors.cardBgColor,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3
    },
    optionLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 16,
      backgroundColor: theme.colors.indicatorActive
    },
    optionContent: {
      flex: 1
    },
    optionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 4
    },
    optionDescription: {
      fontSize: 14,
      color: theme.colors.text,
      opacity: 0.6,
      marginBottom: 4
    },
    currentValue: {
      fontSize: 12,
      color: theme.colors.primary,
      fontWeight: '500'
    },
    iconColor: {
      color: theme.colors.iconColor
    },
    chevronColor: {
      color: theme.colors.text,
      opacity: 0.4
    },
    // Language Modal Styles
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20
    },
    languageModalContainer: {
      backgroundColor: themeType === EThemeType.LIGHT ? '#FFFFFF' : theme.colors.surface,
      borderRadius: 16,
      padding: 20,
      width: '100%',
      maxWidth: 320,
      maxHeight: '80%',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4
      },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
      borderWidth: themeType === EThemeType.DARK ? 1 : 0,
      borderColor: themeType === EThemeType.DARK ? theme.colors.border : 'transparent'
    },
    modalHeader: {
      marginBottom: 20,
      alignItems: 'center'
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 8
    },
    modalSubtitle: {
      fontSize: 14,
      color: theme.colors.text,
      opacity: 0.7,
      textAlign: 'center'
    },
    languagesList: {
      marginBottom: 20
    },
    languageOption: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
      marginBottom: 8,
      borderRadius: 8,
      backgroundColor: themeType === EThemeType.LIGHT ? '#F8F9FA' : theme.colors.background,
      borderWidth: 1,
      borderColor: 'transparent'
    },
    languageOptionSelected: {
      backgroundColor: theme.colors.primary + '15',
      borderColor: theme.colors.primary
    },
    languageOptionContent: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center'
    },
    languageFlag: {
      width: 24,
      height: 24,
      borderRadius: 12,
      marginRight: 12,
      backgroundColor: theme.colors.primary + '20',
      alignItems: 'center',
      justifyContent: 'center'
    },
    languageText: {
      fontSize: 16,
      color: theme.colors.text,
      fontWeight: '500'
    },
    languageTextSelected: {
      color: theme.colors.primary,
      fontWeight: '600'
    },
    modalActions: {
      flexDirection: 'row',
      justifyContent: 'flex-end'
    },
    modalCancelButton: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8
    },
    modalCancelText: {
      fontSize: 14,
      color: theme.colors.text,
      opacity: 0.7,
      fontWeight: '500'
    }
  })

/**
 * Hook personalizado que retorna los estilos de la pantalla de configuración
 * @returns {Object} Estilos de la pantalla de configuración
 */
const useSettingsStyle = () => {
  const { theme, themeType } = useAppTheme()
  return createSettingsStyle(theme, themeType)
}

export default useSettingsStyle 
