import { StyleSheet } from 'react-native'

const createSidebarItemStyles = () =>
  StyleSheet.create({
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

const useSidebarStyles = () => {
  return createSidebarItemStyles()
}

export default useSidebarStyles
