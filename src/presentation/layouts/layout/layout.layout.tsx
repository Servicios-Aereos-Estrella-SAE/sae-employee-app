import React from 'react'
import { View } from 'react-native'
import Header from './header/header.layout'
// import Sidebar from './sidebar/sidebar.loyout'
import useLayoutStyle from './layout.style'
import LayoutController from './layout.controller'
import ILayoutProps from './types/layout-props.interface'

const Layout: React.FC<ILayoutProps> = (props) => {
  const controller = LayoutController(props)
  const styles = useLayoutStyle()

  return (
    <View style={[styles.container]}>
      <Header onMenuPress={controller.handleMenuPress} />
      <View style={styles.content}>{controller.props.children}</View>
      {/* <Sidebar
        isOpen={controller.isSidebarOpen}
        onClose={controller.handleCloseSidebar}
      /> */}
    </View>
  )
}

export default Layout
