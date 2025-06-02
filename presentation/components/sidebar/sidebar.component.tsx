import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Image,
  ScrollView
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import useSidebarStyles from './sidebar.style'
import { ISidebarProps } from './types/sidebar-props.interface'
import SidebarController from './sidebar.controller'
import { CloseSidebarIcon } from '../../icons/close-sidebar-icon/close-sidebar.icon'
import { SidebarIcon } from '../../icons/sidebar-icon/sidebar.icon'
import { ThemeIcon } from '../../icons/theme-icon/theme.icon'
import { ChangeAccountIcon } from '../../icons/change-account-icon/change-account.icon'
import { LogoutIcon } from '../../icons/logout-icon/logout.icon'
import SidebarItem from '../sidebar-item/sidebar-item.component'

/**
 * Componente Sidebar para la aplicación
 * @param {ISidebarProps} props - Propiedades del sidebar
 * @returns {JSX.Element} Componente Sidebar
 */
const SidebarLayout: React.FC<ISidebarProps> = ({ isOpen, onClose }) => {
  const controller = SidebarController({ isOpen, onClose })
  const styles = useSidebarStyles(controller.translateX)

  return (
    <>
      {controller.isOpen && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={controller.onClose}
        />
      )}
      <Animated.View style={styles.sidebar}>
        <SafeAreaView
          edges={['top']}
          style={styles.safeAreaView}
        >
          {/* Botón de cerrar */}
          <TouchableOpacity
            style={[styles.closeButton, { top: controller.insets.top + 15 }]}
            onPress={controller.onClose}
          >
            <CloseSidebarIcon color={styles.sidebarIcon.color} />
          </TouchableOpacity>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Perfil */}
            <View style={styles.profileSection}>
              {controller.authUserAvatarType === 'image' ? (
                <View style={styles.avatarWrapper}>
                  <Image
                    source={{ uri: controller.authUserAvatarSource }}
                    style={styles.avatar}
                  />
                </View>
              ) : (
                <View style={styles.avatarTextWrapper}>
                  <Text style={styles.avatarText}>{controller.authUserAvatarSource}</Text>  
                </View>
              )}
              <Text style={styles.profileName}>
                {controller.authUserName()}
              </Text>
              <Text style={styles.profileEmail}>
                {controller.authUserEmail()}
              </Text>
            </View>

            <View style={styles.menuGroup}>
              <SidebarItem
                icon={<SidebarIcon color={styles.sidebarIcon.color} />}
                label="Checador de Asistencia"
                textColor={styles.sidebarIconText.color}
              />
              {/* <SidebarItem
                icon={<SidebarIcon color={styles.sidebarIcon.color} />}
                label="Calendario"
                textColor={styles.sidebarIconText.color}
              /> */}
              {/* <SidebarItem
                icon={<SidebarIcon color={styles.sidebarIcon.color} />}
                label="Permisos"
                textColor={styles.sidebarIconText.color}
              /> */}
              {/* <SidebarItem
                icon={<SidebarIcon color={styles.sidebarIcon.color} />}
                label="Vacaciones"
                textColor={styles.sidebarIconText.color}
              /> */}
            </View>

            <View style={styles.separator} />

            <View style={styles.menuGroup}>
              <SidebarItem
                icon={<SidebarIcon color={styles.sidebarIcon.color} />}
                label="Mi Perfil"
                textColor={styles.sidebarIconText.color}
              />
            </View>

            <View style={styles.menuGroup}>
              <SidebarItem
                icon={<SidebarIcon color={styles.sidebarIcon.color} />}
                label="Configuración"
                textColor={styles.sidebarIconText.color}
              />
            </View>

            <View style={styles.separator} />

            <View style={styles.menuGroup}>
              <SidebarItem
                icon={
                  <ThemeIcon
                    color={styles.sidebarIcon.color}
                    isDark={controller.themeType === 'dark'}
                  />
                }
                label={controller.themeType === 'dark' ? 'Modo Oscuro' : 'Modo Claro'}
                textColor={styles.sidebarIconText.color}
                onPress={controller.toggleTheme}
              />
            </View>

            <View style={styles.separator} />

            <View style={styles.menuGroup}>
              <SidebarItem
                icon={<ChangeAccountIcon color={styles.sidebarIcon.color} />}
                label="Cambiar de Cuenta"
                textColor={styles.sidebarIconText.color}
                onPress={controller.handleFullLogout}
              />
              <SidebarItem
                icon={<LogoutIcon />}
                label="Cerrar Sesión"
                labelStyle={{ color: styles.sidebarIconText.color }}
                onPress={controller.handleLogout}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </Animated.View>
    </>
  )
}

export default SidebarLayout
