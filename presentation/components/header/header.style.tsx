import { StyleSheet } from 'react-native'
import { useAppTheme } from '../../theme/theme-context'
import { IAppTheme } from '../../theme/app-theme.interface'
import { EThemeType } from '../../theme/types/theme-type.enum'

const createHeaderLayoutStyle = (theme: IAppTheme, themeType: EThemeType) =>
  StyleSheet.create({
    safeArea: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      backgroundColor: 'transparent'
    },
    header: {
      height: 100,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      backgroundColor: 'transparent'
    },
    menuButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: themeType === EThemeType.LIGHT ? '#FFFFFF' : '#2b3652',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5
    },
    rightContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: themeType === EThemeType.LIGHT ? '#FFFFFF' : '#2b3652',
      borderRadius: 25,
      paddingRight: 8,
      paddingLeft: 16,
      paddingVertical: 8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5
    },
    greeting: {
      fontSize: 14,
      fontWeight: '500',
      marginRight: 12,
      color: theme.colors.text
    },
    avatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: 'rgb(210, 237, 248)'
    },
    avatarTextWrapper: {
      width: 36,
      height: 36,
      borderRadius: 18,
      borderWidth: 2,
      borderColor: 'rgb(210, 237, 248)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgb(210, 237, 248)'
    },
    avatarText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#333'
    },
    sidebarIconColor: {
      color: theme.colors.iconColor
    }
  })

const useHeaderLayoutStyle = () => {
  const { theme } = useAppTheme()
  const { themeType } = useAppTheme()
  return createHeaderLayoutStyle(theme, themeType)
}

export default useHeaderLayoutStyle
