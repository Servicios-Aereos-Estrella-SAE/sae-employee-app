import { StyleSheet, Dimensions, Animated } from 'react-native'
import { IAppTheme } from '../../theme/app-theme.interface'
import { useAppTheme } from '../../theme/theme-context'
const { width } = Dimensions.get('window')


const createSidebarStyles = (theme: IAppTheme, translateX: Animated.Value) =>
  StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      zIndex: 1
    },
    sidebar: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: width,
      zIndex: 2,
      elevation: 8,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      overflow: 'hidden',
      transform: [{ translateX }],
      backgroundColor: theme.colors.background,
      shadowColor: theme.dark ? '#000' : '#000'
    },
    closeButton: {
      position: 'absolute',
      right: 16,
      zIndex: 1,
      padding: 10
    },
    scrollContent: {
      paddingBottom: 32
    },
    profileSection: {
      alignItems: 'center',
      paddingTop: 36,
      paddingBottom: 24,
      backgroundColor: theme.colors.background
    },
    avatarWrapper: {
      position: 'relative',
      marginBottom: 12
    },
    avatar: {
      width: 90,
      height: 90,
      borderRadius: 45,
      borderWidth: 2,
      borderColor: theme.colors.border
    },
    avatarTextWrapper: {
      width: 90,
      height: 90,
      borderRadius: 45,
      borderWidth: 2,
      borderColor: 'rgb(210, 237, 248)',
      position: 'relative',
      marginBottom: 12,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgb(210, 237, 248)'
    },
    avatarText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.text
    },
    profileName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.text
    },
    profileEmail: {
      fontSize: 14,
      marginBottom: 10,
      color: theme.colors.text
    },
    menuGroup: {
      marginBottom: 0,
      backgroundColor: theme.colors.background
    },
    separator: {
      height: 1,
      marginVertical: 10,
      marginHorizontal: 18,
      backgroundColor: theme.colors.border
    },
    sidebarIcon: {
      color: theme.colors.textSecondary
    },
    sidebarIconText: {
      color: theme.colors.text
    },
    themeBackgroundColor: {
      color: theme.colors.background
    },
    safeAreaView: {
      flex: 1,
      backgroundColor: theme.colors.background
    }
  })

const useSidebarStyles = (translateX: Animated.Value) => {
  const { theme } = useAppTheme()
  return createSidebarStyles(theme, translateX)
}

export default useSidebarStyles
