import { StyleSheet, Dimensions } from 'react-native'
import { IAppTheme } from '../../theme/app-theme.interface'
import { useAppTheme } from '../../theme/theme-context'
const { height } = Dimensions.get('window')

const createButtonStyles = (theme: IAppTheme) =>
  StyleSheet.create({
    button: {},
    labelStyle: {
      color: theme.colors.buttonText
    },
    themePrimary: {
      color: theme.colors.primary
    },
    buttonContent: {
      height: height * 0.05
    }
  })

const useButtonStyles = () => {
  const { theme } = useAppTheme()
  return createButtonStyles(theme)
}

export default useButtonStyles
