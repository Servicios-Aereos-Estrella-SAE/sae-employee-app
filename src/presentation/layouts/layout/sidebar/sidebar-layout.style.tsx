// import React from 'react'
// import { Dimensions, StyleSheet, Animated } from 'react-native'
// import { IAppTheme } from '../../../theme/app-theme.interface'
// import { useAppTheme } from '../../../theme/ThemeContext'
// import { useSafeAreaInsets } from 'react-native-safe-area-context'

// const insets = useSafeAreaInsets()
// const { width } = Dimensions.get('window')
// const translateX = React.useRef(new Animated.Value(-width)).current

// const createSidebarLayoutStyle = (width: number, theme: IAppTheme) =>
//   StyleSheet.create({
//     overlay: {
//       ...StyleSheet.absoluteFillObject,
//       backgroundColor: 'rgba(0, 0, 0, 0.3)',
//       zIndex: 1
//     },
//     sidebar: {
//       position: 'absolute',
//       left: 0,
//       top: 0,
//       bottom: 0,
//       width: width,
//       zIndex: 2,
//       elevation: 8,
//       shadowOffset: { width: 0, height: 4 },
//       shadowOpacity: 0.12,
//       overflow: 'hidden',
//       backgroundColor: theme.colors.background,
//       shadowColor: theme.dark ? '#000' : '#000',
//       transform: [{ translateX }]
//     },
//     closeButton: {
//       position: 'absolute',
//       right: 16,
//       zIndex: 1,
//       padding: 10,
//       top: insets.top + 15
//     },
//     scrollContent: {
//       paddingBottom: 32
//     },
//     profileSection: {
//       alignItems: 'center',
//       paddingTop: 36,
//       paddingBottom: 24,
//       backgroundColor: theme.colors.background
//     },
//     avatarWrapper: {
//       position: 'relative',
//       marginBottom: 12
//     },
//     avatar: {
//       width: 90,
//       height: 90,
//       borderRadius: 45,
//       borderWidth: 2,
//       borderColor: theme.colors.border
//     },
//     profileName: {
//       fontSize: 20,
//       fontWeight: 'bold',
//       color: theme.colors.text
//     },
//     profileEmail: {
//       fontSize: 14,
//       marginBottom: 10,
//       color: theme.colors.text
//     },
//     menuGroup: {
//       marginBottom: 0,
//       backgroundColor: theme.colors.background
//     },
//     separator: {
//       height: 1,
//       marginVertical: 10,
//       marginHorizontal: 18,
//       backgroundColor: theme.colors.border
//     },
//     menuItem: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       paddingVertical: 14,
//       paddingHorizontal: 24
//     },
//     menuIcon: {
//       width: 28,
//       alignItems: 'center'
//     },
//     menuText: {
//       flex: 1,
//       fontSize: 16,
//       marginLeft: 16
//     },
//     icon: {
//       color: theme.colors.textSecondary
//     },
//     sidebarItem: {
//       color: theme.colors.text
//     },
//     safeAreaView: {
//       flex: 1,
//       backgroundColor: theme.colors.background
//     }
//   })

// const useSidebarLayoutStyle = (isOpen: boolean) => {
//   const { theme } = useAppTheme()

//   // React.useEffect(() => {
//   //   Animated.timing(translateX, {
//   //     toValue: isOpen ? 0 : -width,
//   //     duration: 300,
//   //     useNativeDriver: true,
//   //   }).start()
//   // }, [isOpen])

//   return createSidebarLayoutStyle(width, theme)
// }

// export default useSidebarLayoutStyle
