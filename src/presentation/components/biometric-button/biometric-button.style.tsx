import { StyleSheet } from 'react-native'
import { IAppTheme } from '../../theme/app-theme.interface'
import { useAppTheme } from '../../theme/theme-context'

const createBiometricButtonStyles = (theme: IAppTheme, disabled: boolean) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      marginVertical: 5
    },
    button: {
      width: 70,
      height: 70,
      borderRadius: 35,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 3,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      borderWidth: 1,
      opacity: disabled ? 0.5 : 1,
      backgroundColor: theme.colors.indicatorActive,
      borderColor: theme.colors.indicatorActive
    },
    iconButton: {
      color: theme.colors.textSecondary
    },
    text: {
      marginTop: 8,
      fontSize: 13,
      color: theme.colors.text
    }
  })

const useBiometricButtonStyles = ({ disabled }: { disabled: boolean }) => {
  const { theme } = useAppTheme()
  return createBiometricButtonStyles(theme, disabled)
}

export default useBiometricButtonStyles
