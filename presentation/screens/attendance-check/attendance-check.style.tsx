import { Dimensions, StyleSheet } from 'react-native'
import { IAppTheme } from '../../theme/app-theme.interface'
import { useAppTheme } from '../../theme/theme-context'

// Get screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

// Helper functions for responsive design
const wp = (percentage: number) => (screenWidth * percentage) / 100
const hp = (percentage: number) => (screenHeight * percentage) / 100
const sp = (size: number) => (screenWidth / 375) * size // Scale based on iPhone X width as reference

const createAttendanceCheckStyle = (theme: IAppTheme) =>
  StyleSheet.create({
    backgroundWrapper: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingLeft: wp(4),
      paddingRight: wp(4)
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
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
    },
    checkInButtonWrapper: {
      borderRadius: wp(100),
      padding: wp(2),
      marginTop: hp(4),
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: hp(-9.5),
      zIndex: 1,
      backgroundColor: theme.colors.background
    },
    checkInButton: {
      borderRadius: wp(100),
      width: wp(35),
      height: wp(35),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#34d4ad'
    },
    checkInText: {
      fontWeight: 'bold',
      fontSize: sp(10),
      marginTop: hp(1.5),
      color: theme.colors.buttonText
    },
    timeContainer: {
      marginTop: hp(4),
      alignItems: 'center'
    },
    hour: {
      fontSize: sp(14),
      fontWeight: 'bold',
      color: theme.colors.text
    },
    date: {
      fontSize: sp(12),
      marginTop: hp(0.5),
      textTransform: 'capitalize',
      color: theme.colors.text
    },
    indicatorsContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginTop: hp(1),
      gap: hp(1.2),
      width: '100%'
    },
    indicator: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: hp(1.4),
      paddingHorizontal: wp(4.3),
      borderRadius: wp(3),
      backgroundColor: theme.colors.indicator
    },
    indicatorLabel: {
      fontSize: sp(12),
      flex: 1,
      marginLeft: wp(4.3),
      color: theme.colors.textSecondary
    },
    indicatorValue: {
      fontWeight: 'bold',
      fontSize: sp(15),
      flex: 1,
      textAlign: 'right',
      marginLeft: wp(6.4),
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
      borderRadius: wp(5),
      marginTop: hp(3.8),
      width: '100%',
      alignSelf: 'center',
      paddingVertical: hp(3.8),
      paddingHorizontal: wp(4.3),
      backgroundColor: theme.colors.indicator
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
      gap: hp(2.4)
    },
    cancelButton: {
      backgroundColor: '#f1f5f9',
      borderRadius: wp(5),
      paddingVertical: hp(1.4),
      paddingHorizontal: wp(6.4),
      marginTop: hp(1.9)
    },
    cancelButtonText: {
      color: '#88a4bf',
      fontWeight: 'bold',
      fontSize: sp(15)
    },
    checkIconIndicator: {
      color: theme.colors.textSecondary
    },
    checkButtonIcon: {
      color: theme.colors.buttonText
    },
    checkButtonIconLocked: {
      color: theme.colors.textSecondary
    },
    locationContainer: {
      marginTop: hp(2.9),
      paddingTop: hp(2.4),
      borderTopWidth: 1,
      borderTopColor: theme.colors.indicatorActive,
      width: '100%'
    },
    locationTitle: {
      fontSize: sp(15),
      fontWeight: 'bold',
      marginBottom: hp(1),
      color: theme.colors.text,
      textAlign: 'center'
    },
    locationCoordinates: {
      fontSize: sp(15),
      fontFamily: 'monospace',
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: hp(0.5)
    },
    locationAccuracy: {
      fontSize: sp(15),
      color: theme.colors.textSecondary,
      textAlign: 'center'
    },
    locationPlaceholder: {
      fontSize: sp(15),
      color: theme.colors.textSecondary,
      textAlign: 'center',
      fontStyle: 'italic'
    },
    scrollContainer: {
      flex: 1,
      width: '100%'
    },
    scrollContent: {
      flexGrow: 1,
      alignItems: 'center',
      paddingHorizontal: 0,
      paddingBottom: hp(2)
    },
    dateShiftContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginTop: hp(4)
    },
    dateShift: {
      fontSize: sp(15),
      fontWeight: 'bold',
      color: theme.colors.text
    }
  })

const useAttendanceCheckStyle = () => {
  const { theme } = useAppTheme()
  return createAttendanceCheckStyle(theme)
}

export default useAttendanceCheckStyle
