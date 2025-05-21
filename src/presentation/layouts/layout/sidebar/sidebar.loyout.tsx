// import React from 'react'
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Animated,
//   Image,
//   ScrollView,
//   Dimensions,
//   Appearance
// } from 'react-native'
// import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

// import useSidebarLayoutStyle from './sidebar-layout.style'

// import CloseSidebarIcon from './assets/close-sidebar.icon'
// import SidebarIcon from './assets/sidebar.icon'
// import ThemeIcon from './assets/theme.icon'
// import ChangeAccountIcon from './assets/change-account.icon'
// import LogoutIcon from './assets/logout.icon'

// import ISidebarProps from './types/sidebar-props.interface'
// import SidebarLayoutController from './sidebar-layout.controller'

// const Sidebar: React.FC<ISidebarProps> = ({ isOpen, onClose }) => {
//   const { width } = Dimensions.get('window')
//   const translateX = React.useRef(new Animated.Value(-width)).current
//   // const insets = useSafeAreaInsets()

//   const styles = useSidebarLayoutStyle(isOpen)
//   const controller = SidebarLayoutController()

//   React.useEffect(() => {
//     Animated.timing(translateX, {
//       toValue: isOpen ? 0 : -width,
//       duration: 300,
//       useNativeDriver: true
//     }).start()
//   }, [isOpen])

//   return (
//     <>
//       {isOpen && (
//         <TouchableOpacity
//           style={styles.overlay}
//           activeOpacity={1}
//           onPress={onClose}
//         />
//       )}
//       <Animated.View style={[styles.sidebar]}>
//         <SafeAreaView edges={['top']} style={styles.safeAreaView}>
//           {/* Botón de cerrar */}
//           <TouchableOpacity style={[styles.closeButton]} onPress={onClose}>
//             <CloseSidebarIcon color={styles.icon.color} />
//           </TouchableOpacity>
//           <ScrollView
//             contentContainerStyle={styles.scrollContent}
//             showsVerticalScrollIndicator={false}
//           >
//             {/* Perfil */}
//             <View style={[styles.profileSection]}>
//               <View style={styles.avatarWrapper}>
//                 <Image
//                   source={{
//                     uri: 'https://randomuser.me/api/portraits/men/1.jpg'
//                   }}
//                   style={[styles.avatar]}
//                 />
//               </View>
//               <Text style={[styles.profileName]}>
//                 José Guadalupe Soto Becerra
//               </Text>
//               <Text style={[styles.profileEmail]}>jsoto@sile-mx.com</Text>
//             </View>

//             <View style={[styles.menuGroup]}>
//               <SidebarItem
//                 icon={<SidebarIcon color={styles.icon.color} />}
//                 label="Checador de Asistencia"
//                 textColor={styles.sidebarItem.color}
//                 styles={styles}
//               />
//               <SidebarItem
//                 icon={<SidebarIcon color={styles.icon.color} />}
//                 label="Calendario"
//                 textColor={styles.sidebarItem.color}
//                 styles={styles}
//               />
//               <SidebarItem
//                 icon={<SidebarIcon color={styles.icon.color} />}
//                 label="Permisos"
//                 textColor={styles.sidebarItem.color}
//                 styles={styles}
//               />
//               <SidebarItem
//                 icon={<SidebarIcon color={styles.icon.color} />}
//                 label="Vacaciones"
//                 textColor={styles.sidebarItem.color}
//                 styles={styles}
//               />
//             </View>

//             <View style={[styles.separator]} />

//             <View style={[styles.menuGroup]}>
//               <SidebarItem
//                 icon={<SidebarIcon color={styles.icon.color} />}
//                 label="Mi Perfil"
//                 styles={styles}
//                 textColor={styles.sidebarItem.color}
//               />
//             </View>

//             <View style={[styles.menuGroup]}>
//               <SidebarItem
//                 icon={<SidebarIcon color={styles.icon.color} />}
//                 label="Configuración"
//                 textColor={styles.sidebarItem.color}
//                 styles={styles}
//               />
//             </View>

//             <View style={[styles.separator]} />

//             <View style={[styles.menuGroup]}>
//               <SidebarItem
//                 icon={
//                   <ThemeIcon
//                     color={styles.icon.color}
//                     isDark={controller.themeIsDark}
//                   />
//                 }
//                 label={controller.toggleThemeLabel}
//                 textColor={styles.sidebarItem.color}
//                 styles={styles}
//                 onPress={controller.toggleTheme}
//               />
//             </View>

//             <View style={[styles.separator]} />

//             <View style={[styles.menuGroup]}>
//               <SidebarItem
//                 icon={<ChangeAccountIcon color={styles.icon.color} />}
//                 label="Cambiar de Cuenta"
//                 textColor={styles.sidebarItem.color}
//                 onPress={controller.handleFullLogout}
//                 styles={styles}
//               />
//               <SidebarItem
//                 icon={<LogoutIcon />}
//                 label="Cerrar Sesión"
//                 labelStyle={{ color: '#cd360c' }}
//                 onPress={controller.handleLogout}
//                 styles={styles}
//               />
//             </View>
//           </ScrollView>
//         </SafeAreaView>
//       </Animated.View>
//     </>
//   )
// }

// const SidebarItem: React.FC<{
//   icon: React.ReactNode
//   label: string
//   styles: any
//   labelStyle?: any
//   textColor?: string
//   onPress?: () => void
// }> = ({ icon, label, styles, labelStyle, textColor, onPress }) => (
//   <TouchableOpacity style={styles.menuItem} onPress={onPress}>
//     <View style={styles.menuIcon}>{icon}</View>
//     <Text style={[styles.menuText, { color: textColor }, labelStyle]}>
//       {label}
//     </Text>
//   </TouchableOpacity>
// )

// export default Sidebar
