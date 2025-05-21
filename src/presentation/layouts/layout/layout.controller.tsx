import { useState } from 'react'
import ILayoutProps from './types/layout-props.interface'

const LayoutController = (props: ILayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleMenuPress = () => {
    setIsSidebarOpen(true)
  }

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false)
  }

  return {
    isSidebarOpen,
    handleMenuPress,
    handleCloseSidebar,
    props
  }
}

export default LayoutController
