import { StyleSheet } from 'react-native'
import { useAppTheme } from '../../theme/theme-context'
import { IAppTheme } from '../../theme/app-theme.interface'

const createLayoutStyle = (theme: IAppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent'
    },
    content: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      backgroundColor: theme.colors.background
    }
  })

const useLayoutStyle = () => {
  const { theme } = useAppTheme()
  return createLayoutStyle(theme)
}

export default useLayoutStyle
