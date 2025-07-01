import { Dimensions, StyleSheet } from 'react-native'
import { IAppTheme } from '../../theme/app-theme.interface'
import { useAppTheme } from '../../theme/theme-context'
const { height } = Dimensions.get('window')

const createButtonStyles = (theme: IAppTheme, mode: 'contained' | 'outlined' | 'text' | 'elevated' | 'contained-tonal') =>
  StyleSheet.create({
    button: {
      backgroundColor: mode === 'contained' ? theme.colors.primary : theme.colors.indicator,
      height: height * 0.055,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: mode === 'contained' ? theme.colors.primary : theme.colors.indicator,
      width: '100%',
      borderRadius: 40
    },
    disabledButton: {
      opacity: 0.5
    },
    labelStyle: {
      color: mode === 'contained' ? theme.colors.buttonText : theme.colors.primary
    },
    themePrimary: {
      color: theme.colors.primary
    },
    buttonContent: {
      flex: 1,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 16,
      minHeight: height * 0.055
    },
    contentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '500',
      textAlign: 'center'
    },
    loadingIndicator: {
      marginVertical: 2
    },
    iconStyle: {
      margin: 0,
      marginRight: 8
    }
  })

const useButtonStyles = (mode: 'contained' | 'outlined' | 'text' | 'elevated' | 'contained-tonal') => {
  const { theme } = useAppTheme()
  return createButtonStyles(theme, mode || 'contained')
}

export default useButtonStyles
