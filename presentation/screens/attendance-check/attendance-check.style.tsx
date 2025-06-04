import { StyleSheet } from 'react-native'
import { useAppTheme } from '../../theme/theme-context'
import { IAppTheme } from '../../theme/app-theme.interface'

const createAttendanceCheckStyle = (theme: IAppTheme) =>
  StyleSheet.create({
    backgroundWrapper: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingTop: 100
    },
    backgroundImage: {
      flex: 1,
      width: '100%',
      height: '100%'
    },
    container: {
      flex: 1,
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    checkInContainer: {
      marginTop: 85,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      zIndex: 1
    },
    checkInButtonWrapper: {
      borderRadius: 110,
      padding: 10,
      shadowColor: '#88a4bf',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.1,
      shadowRadius: 16,
      elevation: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: -80,
      zIndex: 1,
      backgroundColor: theme.colors.accent
    },
    checkInButton: {
      borderRadius: 100,
      width: 180,
      height: 180,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#093057',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 16,
      elevation: 8,
      backgroundColor: theme.colors.button
    },
    checkInText: {
      fontWeight: 'bold',
      fontSize: 17,
      marginTop: 12,
      color: theme.colors.buttonText
    },
    themeToggle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      borderRadius: 20,
      position: 'absolute',
      right: 16,
      top: 50,
      zIndex: 10
    },
    themeToggleText: {
      marginLeft: 8,
      fontWeight: '500'
    },
    themeInfo: {
      marginBottom: 12,
      padding: 8,
      borderRadius: 8,
      alignItems: 'center'
    },
    themeInfoText: {
      fontSize: 12,
      fontWeight: '500'
    },
    timeContainer: {
      marginTop: 32,
      alignItems: 'center'
    },
    hour: {
      fontSize: 40,
      fontWeight: 'bold',
      color: theme.colors.text
    },
    date: {
      fontSize: 18,
      marginTop: 4,
      textTransform: 'capitalize',
      color: theme.colors.text
    },
    indicatorsContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginTop: 36,
      gap: 10,
      width: '100%'
    },
    indicator: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 15,
      backgroundColor: theme.colors.indicator
    },
    indicatorLabel: {
      fontSize: 14,
      flex: 1,
      marginLeft: 16,
      color: theme.colors.textSecondary
    },
    indicatorValue: {
      fontWeight: 'bold',
      fontSize: 16,
      flex: 1,
      textAlign: 'right',
      marginLeft: 24,
      color: theme.colors.textSecondary
    },
    indicatorActive: {
      backgroundColor: theme.colors.indicatorActive
    },
    indicatorLabelActive: {
      color: theme.colors.accent
    },
    indicatorValueActive: {
      color: theme.colors.accent
    },
    bottomCard: {
      borderRadius: 32,
      marginTop: 32,
      width: '100%',
      alignSelf: 'center',
      paddingVertical: 32,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.cardBgColor,
      shadowColor: 'rgba(0, 0, 0, 0.5)',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5
    },
    checkInButtonWrapperLocked: {
      opacity: 1,
      backgroundColor: theme.colors.background
    },
    checkInButtonLocked: {
      backgroundColor: theme.colors.background
    },
    checkInTextLocked: {
      color: theme.colors.textSecondary
    },
    biometricContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20
    },
    cancelButton: {
      backgroundColor: '#f1f5f9',
      borderRadius: 15,
      paddingVertical: 12,
      paddingHorizontal: 24,
      marginTop: 16
    },
    cancelButtonText: {
      color: '#88a4bf',
      fontWeight: 'bold',
      fontSize: 16
    },
    checkIconIndicator: {
      color: theme.colors.textSecondary
    },
    checkButtonIcon: {
      color: theme.colors.buttonText
    },
    checkButtonIconLocked: {
      color: theme.colors.textSecondary
    }
  })

const useAttendanceCheckStyle = () => {
  const { theme } = useAppTheme()
  return createAttendanceCheckStyle(theme)
}

export default useAttendanceCheckStyle
