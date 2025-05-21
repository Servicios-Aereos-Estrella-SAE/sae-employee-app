import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
  ScrollView,
  Dimensions
} from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import Svg, { Path } from 'react-native-svg'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigation/types/types'
// import { UserController } from '../../../models/user-old/infrastructure/UserController';
// import { AuthService } from '../../../models/user-old/application/AuthService';
import { useAppTheme } from '../../theme/theme-context'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const SidebarIcon = ({ color }: { color: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 3a1 1 0 0 1 .993.883L13 4v16a1 1 0 0 1-1.993.117L11 20V4a1 1 0 0 1 1-1ZM8 6a1 1 0 0 1 .993.883L9 7v10a1 1 0 0 1-1.993.117L7 17V7a1 1 0 0 1 1-1Zm8 0a1 1 0 0 1 .993.883L17 7v10a1 1 0 0 1-1.993.117L15 17V7a1 1 0 0 1 1-1ZM4 9a1 1 0 0 1 .993.883L5 10v4a1 1 0 0 1-1.993.117L3 14v-4a1 1 0 0 1 1-1Zm16 0a1 1 0 0 1 .993.883L21 10v4a1 1 0 0 1-1.993.117L19 14v-4a1 1 0 0 1 1-1Z"
      fill={color}
    />
  </Svg>
)
const CloseSidebarIcon = ({ color }: { color: string }) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24">
    <Path
      d="m4.21 4.387.083-.094a1 1 0 0 1 1.32-.083l.094.083L12 10.585l6.293-6.292a1 1 0 1 1 1.414 1.414L13.415 12l6.292 6.293a1 1 0 0 1 .083 1.32l-.083.094a1 1 0 0 1-1.32.083l-.094-.083L12 13.415l-6.293 6.292a1 1 0 0 1-1.414-1.414L10.585 12 4.293 5.707a1 1 0 0 1-.083-1.32l.083-.094-.083.094Z"
      fill={color}
    ></Path>
  </Svg>
)

const LogoutIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.9 11.6c-.1-.1-.1-.2-.2-.3l-3-3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l1.3 1.3H13c-.6 0-1 .4-1 1s.4 1 1 1h4.6l-1.3 1.3c-.4.4-.4 1 0 1.4.2.2.5.3.7.3s.5-.1.7-.3l3-3c.1-.1.2-.2.2-.3.1-.3.1-.5 0-.8z"
      fill="#cd360c"
    />
    <Path
      d="M15.5 18.1c-1.1.6-2.3.9-3.5.9-3.9 0-7-3.1-7-7s3.1-7 7-7c1.2 0 2.4.3 3.5.9.5.3 1.1.1 1.4-.4.3-.5.1-1.1-.4-1.4C15.1 3.4 13.6 3 12 3c-5 0-9 4-9 9s4 9 9 9c1.6 0 3.1-.4 4.5-1.2.5-.3.6-.9.4-1.4-.3-.4-.9-.6-1.4-.3z"
      fill="#cd360c"
    />
  </Svg>
)

const ChangeAccountIcon = ({ color }: { color: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15.75 13.997a2.249 2.249 0 0 1 2.25 2.25v.918c0 .285-.045.567-.13.836h-2.035a1.75 1.75 0 0 0-2.822-1.98l-2.5 2.498a1.75 1.75 0 0 0 0 2.477l.935.933c-.465.046-.948.07-1.452.07-3.42 0-5.943-1.073-7.486-3.237A2.75 2.75 0 0 1 2 17.166v-.92a2.249 2.249 0 0 1 2.249-2.249H15.75ZM9.996 2.002a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z"
      fill={color}
    />
    <Path
      d="M14.78 17.784a.75.75 0 0 0-1.06-1.06l-2.5 2.5a.75.75 0 0 0 0 1.06l2.5 2.5a.75.75 0 0 0 1.06-1.061l-1.22-1.22h6.88l-1.22 1.22a.75.75 0 0 0 1.06 1.06l2.5-2.498a.75.75 0 0 0 0-1.06l-2.5-2.502a.75.75 0 1 0-1.06 1.06l1.218 1.22h-6.877l1.22-1.22Z"
      fill={color}
    />
  </Svg>
)

const ThemeIcon = ({ color, isDark }: { color: string; isDark: boolean }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    {isDark ? (
      <Path
        d="M20.026 17.001c-2.762 4.784-8.879 6.423-13.663 3.661A9.965 9.965 0 0 1 3.13 17.68a.75.75 0 0 1 .365-1.132c3.767-1.348 5.785-2.91 6.956-5.146 1.232-2.353 1.551-4.93.689-8.463a.75.75 0 0 1 .769-.927 9.961 9.961 0 0 1 4.457 1.327c4.784 2.762 6.423 8.879 3.66 13.662Z"
        fill={color}
      />
    ) : (
      <>
        <Path
          d="M3.28034 2.21968C2.98745 1.92678 2.51257 1.92677 2.21968 2.21966C1.92678 2.51255 1.92677 2.98743 2.21966 3.28032L10.4125 11.4733C9.23612 13.6704 7.22138 15.214 3.49418 16.5481C3.03059 16.714 2.84994 17.274 3.12921 17.6796C3.96449 18.8925 5.06116 19.91 6.36388 20.6621C10.281 22.9237 15.092 22.2343 18.2229 19.2839L20.7194 21.7805C21.0123 22.0734 21.4872 22.0734 21.7801 21.7805C22.073 21.4876 22.073 21.0127 21.7801 20.7198L3.28034 2.21968Z"
          fill={color}
        />
        <Path
          d="M16.3654 3.33892C21.1159 6.0816 22.7652 12.1329 20.0831 16.9015L11.4926 8.31074C11.7443 6.74993 11.6444 5.00818 11.1392 2.9385C11.02 2.44997 11.4058 1.9848 11.908 2.01174C13.465 2.09528 14.986 2.54252 16.3654 3.33892Z"
          fill={color}
        />
      </>
    )}
  </Svg>
)

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const translateX = React.useRef(new Animated.Value(-width)).current
  const insets = useSafeAreaInsets()
  const { theme, themeType, toggleTheme } = useAppTheme()
  // const systemColorScheme = Appearance.getColorScheme()

  React.useEffect(() => {
    Animated.timing(translateX, {
      toValue: isOpen ? 0 : -width,
      duration: 300,
      useNativeDriver: true
    }).start()
     
  }, [isOpen])

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  // const userController = new UserController()
  // const authService = new AuthService(userController)

  const handleLogout = async () => {
    // await authService.clearAuthState()
    navigation.replace('Login')
  }
  const handleFullLogout = async () => {
    // await authService.clearFullAuthState()
    navigation.replace('Login')
  }

  return (
    <>
      {isOpen && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={onClose}
        />
      )}
      <Animated.View
        style={[
          styles.sidebar,
          {
            transform: [{ translateX }],
            backgroundColor: theme.colors.background,
            shadowColor: theme.dark ? '#000' : '#000'
          }
        ]}
      >
        <SafeAreaView
          edges={['top']}
          style={{ flex: 1, backgroundColor: theme.colors.background }}
        >
          {/* Botón de cerrar */}
          <TouchableOpacity
            style={[styles.closeButton, { top: insets.top + 15 }]}
            onPress={onClose}
          >
            <CloseSidebarIcon color={theme.colors.textSecondary} />
          </TouchableOpacity>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Perfil */}
            <View
              style={[
                styles.profileSection,
                { backgroundColor: theme.colors.background }
              ]}
            >
              <View style={styles.avatarWrapper}>
                <Image
                  source={{
                    uri: 'https://randomuser.me/api/portraits/men/1.jpg'
                  }}
                  style={[styles.avatar, { borderColor: theme.colors.border }]}
                />
              </View>
              <Text style={[styles.profileName, { color: theme.colors.text }]}>
                José Guadalupe Soto Becerra
              </Text>
              <Text style={[styles.profileEmail, { color: theme.colors.text }]}>
                jsoto@sile-mx.com
              </Text>
            </View>

            <View
              style={[
                styles.menuGroup,
                { backgroundColor: theme.colors.background }
              ]}
            >
              <SidebarItem
                icon={<SidebarIcon color={theme.colors.textSecondary} />}
                label="Checador de Asistencia"
                textColor={theme.colors.text}
              />
              <SidebarItem
                icon={<SidebarIcon color={theme.colors.textSecondary} />}
                label="Calendario"
                textColor={theme.colors.text}
              />
              <SidebarItem
                icon={<SidebarIcon color={theme.colors.textSecondary} />}
                label="Permisos"
                textColor={theme.colors.text}
              />
              <SidebarItem
                icon={<SidebarIcon color={theme.colors.textSecondary} />}
                label="Vacaciones"
                textColor={theme.colors.text}
              />
            </View>

            <View
              style={[
                styles.separator,
                { backgroundColor: theme.colors.border }
              ]}
            />

            <View
              style={[
                styles.menuGroup,
                { backgroundColor: theme.colors.background }
              ]}
            >
              <SidebarItem
                icon={<SidebarIcon color={theme.colors.textSecondary} />}
                label="Mi Perfil"
                textColor={theme.colors.text}
              />
            </View>

            <View
              style={[
                styles.menuGroup,
                { backgroundColor: theme.colors.background }
              ]}
            >
              <SidebarItem
                icon={<SidebarIcon color={theme.colors.textSecondary} />}
                label="Configuración"
                textColor={theme.colors.text}
              />
            </View>

            <View
              style={[
                styles.separator,
                { backgroundColor: theme.colors.border }
              ]}
            />

            <View
              style={[
                styles.menuGroup,
                { backgroundColor: theme.colors.background }
              ]}
            >
              <SidebarItem
                icon={
                  <ThemeIcon
                    color={theme.colors.textSecondary}
                    isDark={themeType === 'dark'}
                  />
                }
                label={themeType === 'dark' ? 'Modo Oscuro' : 'Modo Claro'}
                textColor={theme.colors.text}
                onPress={toggleTheme}
              />
            </View>

            <View
              style={[
                styles.separator,
                { backgroundColor: theme.colors.border }
              ]}
            />

            <View
              style={[
                styles.menuGroup,
                { backgroundColor: theme.colors.background }
              ]}
            >
              <SidebarItem
                icon={<ChangeAccountIcon color={theme.colors.textSecondary} />}
                label="Cambiar de Cuenta"
                textColor={theme.colors.text}
                onPress={handleFullLogout}
              />
              <SidebarItem
                icon={<LogoutIcon />}
                label="Cerrar Sesión"
                labelStyle={{ color: '#cd360c' }}
                onPress={handleLogout}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </Animated.View>
    </>
  )
}

const SidebarItem: React.FC<{
  icon: React.ReactNode
  label: string
  labelStyle?: any
  textColor?: string
  onPress?: () => void
}> = ({ icon, label, labelStyle, textColor, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuIcon}>{icon}</View>
    <Text style={[styles.menuText, { color: textColor }, labelStyle]}>
      {label}
    </Text>
  </TouchableOpacity>
)

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
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
    overflow: 'hidden'
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
    paddingBottom: 24
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 12
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  profileEmail: {
    fontSize: 14,
    marginBottom: 10
  },
  menuGroup: {
    marginBottom: 0
  },
  separator: {
    height: 1,
    marginVertical: 10,
    marginHorizontal: 18
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24
  },
  menuIcon: {
    width: 28,
    alignItems: 'center'
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 16
  }
})

export default Sidebar
