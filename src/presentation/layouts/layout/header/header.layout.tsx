import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import useHeaderLayoutStyle from './header-layout.style'
import SidebarIcon from './assets/sidebar.icon'
import HeaderLayoutController from './header-layout.controller'
import IHeaderProps from './types/header-props.interface'

/**
 * Componente Header para la aplicación
 * @component
 * @param {Function} props.onMenuPress - Función a ejecutar cuando se presiona el botón de menú
 * @returns {JSX.Element} Componente Header
 */
const Header: React.FC<IHeaderProps> = ({ onMenuPress }) => {
  const styles = useHeaderLayoutStyle()
  const controller = HeaderLayoutController()

  return (
    <SafeAreaView edges={['top']} style={[styles.safeArea]}>
      <View style={[styles.header]}>
        <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
          <SidebarIcon color={styles.sidebarIconColor.color} />
        </TouchableOpacity>
        <View style={styles.rightContainer}>
          <Text style={[styles.greeting]}>{controller.getGreeting()}</Text>
          <Image
            source={{ uri: controller.getUserImage() }}
            style={styles.avatar}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Header
