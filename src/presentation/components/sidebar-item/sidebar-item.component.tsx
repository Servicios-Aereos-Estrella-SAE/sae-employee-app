import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import useSidebarItemStyles from './sidebar-item.style'

const SidebarItem: React.FC<{
  icon: React.ReactNode
  label: string
  labelStyle?: any
  textColor?: string
  onPress?: () => void
}> = ({ icon, label, labelStyle, textColor, onPress }) => {
  const styles = useSidebarItemStyles()

  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuIcon}>{icon}</View>
      <Text style={[styles.menuText, { color: textColor }, labelStyle]}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}

export default SidebarItem
