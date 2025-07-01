import { Image, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Typography } from '../typography/typography.component'
import SidebarIcon from './assets/sidebar.icon'
import HeaderLayoutController from './header.controller'
import useHeaderLayoutStyle from './header.style'
import IHeaderProps from './types/header-props.interface'

/**
 * Componente Header para la aplicación
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
          <Typography variant="h3" style={[styles.greeting]}>{controller.authUserName()}</Typography>

          {controller.authUserAvatarType === 'image' ? (
            <Image
              source={{ uri: controller.authUserAvatarSource }}
              style={styles.avatar}
            />
          ) : (
            <View style={styles.avatarTextWrapper}>
              <Typography variant="body2" style={styles.avatarText}>{controller.authUserAvatarSource}</Typography>  
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Header
