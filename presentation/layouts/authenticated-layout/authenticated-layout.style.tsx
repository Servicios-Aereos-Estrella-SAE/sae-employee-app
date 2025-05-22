import { StyleSheet } from 'react-native'
import { IAppTheme } from '../../theme/app-theme.interface'
import { useAppTheme } from '../../theme/theme-context'

const createAuthenticatedLayoutStyle = (theme: IAppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background
    }
  })

const AuthenticatedLayoutStyle = () => {
  const { theme } = useAppTheme()
  return createAuthenticatedLayoutStyle(theme)
}

export default AuthenticatedLayoutStyle
