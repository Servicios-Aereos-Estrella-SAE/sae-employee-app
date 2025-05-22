import { StyleSheet, Dimensions } from 'react-native'
import { IAppTheme } from '../../theme/app-theme.interface'
import { useAppTheme } from '../../theme/theme-context'
const { height } = Dimensions.get('window')

const createTextInputStyles = (theme: IAppTheme) =>
  StyleSheet.create({
    container: {
      marginBottom: 16
    },
    labelText: {
      fontSize: 14,
      marginBottom: 4,
      fontWeight: '500',
      paddingLeft: 12,
      color: theme.colors.text
    },
    input: {
      backgroundColor: theme.colors.surface,
      height: height * 0.055,
      paddingHorizontal: 5
    },
    outline: {
      borderRadius: 25,
      borderWidth: 1,
      borderColor: theme.colors.border
    },
    errorText: {
      color: '#FF0000',
      fontSize: 12,
      marginTop: 4,
      paddingLeft: 12
    },
    primaryColor: {
      color: theme.colors.primary
    },
    backgroundColor: {
      color: theme.colors.surface
    },
    placeholderColor: {
      color: theme.colors.placeholder
    },
    textColor: {
      color: theme.colors.text
    },
    textSecondaryColor: {
      color: theme.colors.textSecondary
    }
  })

const useTextInputStyles = () => {
  const { theme } = useAppTheme()
  return createTextInputStyles(theme)
}

export default useTextInputStyles
