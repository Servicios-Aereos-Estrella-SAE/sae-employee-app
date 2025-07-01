import { StyleSheet } from 'react-native'
import { IAppTheme } from '../../theme/app-theme.interface'
import { useAppTheme } from '../../theme/theme-context'

const createLayoutStyle = (theme: IAppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background
    },
    content: {
      flex: 1,
      backgroundColor: theme.colors.background
    }
  })

const useLayoutStyle = () => {
  const { theme } = useAppTheme()
  return createLayoutStyle(theme)
}

export default useLayoutStyle
