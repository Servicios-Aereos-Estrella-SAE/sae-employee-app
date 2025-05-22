import { View } from 'react-native'
import Sidebar from '../../components/sidebar/sidebar.component'
import useLayoutStyle from './layout.style'
import LayoutController from './layout.controller'
import { ILayoutProps } from './types/layout-props.interface'
import Header from '../../components/header/header.component'

/**
 * Layout principal de la aplicación
 * @param {ILayoutProps} props - Propiedades del layout
 * @returns {JSX.Element} Layout principal de la aplicación
 */
const Layout: React.FC<ILayoutProps> = (props) => {
  const controller = LayoutController(props)
  const styles = useLayoutStyle()

  return (
    <View style={[styles.container]}>
      <Header onMenuPress={controller.handleMenuPress} />
      <View style={styles.content}>{controller.props.children}</View>
      <Sidebar
        isOpen={controller.isSidebarOpen}
        onClose={controller.handleCloseSidebar}
      />
    </View>
  )
}

export default Layout
