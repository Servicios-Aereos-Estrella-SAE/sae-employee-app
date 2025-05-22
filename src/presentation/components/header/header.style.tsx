import { StyleSheet } from 'react-native'
import { IAppTheme } from '../../theme/app-theme.interface'
import { useAppTheme } from '../../theme/theme-context'

const createHeaderLayoutStyle = (theme: IAppTheme) =>
  StyleSheet.create({
    safeArea: {
      backgroundColor: theme.colors.background
    },
    header: {
      height: 100,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      backgroundColor: theme.colors.background
    },
    menuButton: {
      padding: 8
    },
    rightContainer: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    greeting: {
      fontSize: 14,
      fontWeight: '500',
      marginRight: 8,
      color: theme.colors.text
    },
    avatar: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: '#eee'
    },
    sidebarIconColor: {
      color: theme.colors.textSecondary
    }
  })

const useHeaderLayoutStyle = () => {
  const { theme } = useAppTheme()
  return createHeaderLayoutStyle(theme)
}

export default useHeaderLayoutStyle
