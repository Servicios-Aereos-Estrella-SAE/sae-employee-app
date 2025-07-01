import { Dimensions, StyleSheet } from 'react-native'
import { IAppTheme } from '../../theme/app-theme.interface'
import { useAppTheme } from '../../theme/theme-context'
import { EThemeType } from '../../theme/types/theme-type.enum'

const { width, height: screenHeight } = Dimensions.get('window')
const hp = (percentage: number) => (screenHeight * percentage) / 100
const wp = (percentage: number) => (width * percentage) / 100

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
      padding: wp(4)
    },
    safeAreaContent: {
      flex: 1,
      backgroundColor: theme.colors.background
    },
    scrollContent: {
      flexGrow: 1
    },
    header: {
      marginBottom: hp(3.6),
      flexDirection: 'column',
      justifyContent: 'flex-start',
      textAlign: 'left'
    },
    title: {
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: hp(1),
      textAlign: 'left'
    },
    subtitle: {
      color: theme.colors.text,
      textAlign: 'left',
      opacity: 0.7
    },
    optionsContainer: {
      flex: 1
    },
    optionCard: {
      backgroundColor: themeType === EThemeType.LIGHT ? '#FFFFFF' : theme.colors.cardBgColor,
      borderRadius: wp(3),
      padding: wp(4),
      marginBottom: hp(1.4),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: theme.colors.border
    },
    optionLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1
    },
    iconContainer: {
      width: wp(12),
      height: wp(12),
      borderRadius: wp(6),
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: wp(4),
      backgroundColor: theme.colors.indicatorActive
    },
    optionContent: {
      flex: 1
    },
    optionTitle: {
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: hp(0.5)
    },
    optionDescription: {
      color: theme.colors.text,
      opacity: 0.6,
      marginBottom: hp(0.5)
    },
    currentValue: {
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
      padding: wp(5)
    },
    languageModalContainer: {
      backgroundColor: themeType === EThemeType.LIGHT ? '#FFFFFF' : theme.colors.surface,
      borderRadius: wp(4),
      padding: wp(5),
      width: '100%',
      maxWidth: wp(80),
      maxHeight: '80%',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: hp(0.48)
      },
      shadowOpacity: 0.3,
      shadowRadius: wp(2),
      elevation: 8,
      borderWidth: themeType === EThemeType.DARK ? 1 : 0,
      borderColor: themeType === EThemeType.DARK ? theme.colors.border : 'transparent'
    },
    modalHeader: {
      marginBottom: hp(2.4),
      alignItems: 'center'
    },
    modalTitle: {
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: hp(1)
    },
    modalSubtitle: {
      color: theme.colors.text,
      opacity: 0.7,
      textAlign: 'center'
    },
    languagesList: {
      marginBottom: hp(2.4)
    },
    languageOption: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: hp(1.4),
      paddingHorizontal: wp(4),
      marginBottom: hp(1),
      borderRadius: wp(2),
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
      width: wp(6),
      height: wp(6),
      borderRadius: wp(3),
      marginRight: wp(3),
      backgroundColor: theme.colors.primary + '20',
      alignItems: 'center',
      justifyContent: 'center'
    },
    languageText: {
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
      paddingVertical: hp(1),
      paddingHorizontal: wp(4),
      borderRadius: wp(2)
    },
    modalCancelText: {
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
