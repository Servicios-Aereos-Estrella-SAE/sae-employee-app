import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Typography } from '../typography/typography.component'
import useSidebarItemStyles from './sidebar-item.style'
import { ISidebarItemProps } from './types/sidebar-item-props.interface'

/**
 * Item del sidebar
 * @param {ISidebarItemProps} props - Propiedades del item del sidebar
 * @returns {React.FC} Item del sidebar
 */
const SidebarItem: React.FC<ISidebarItemProps> = ({ icon, label, labelStyle, textColor, onPress }) => {
  const styles = useSidebarItemStyles()

  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuIcon}>{icon}</View>
      <Typography variant="body" style={[styles.menuText, { color: textColor }, labelStyle]}>
        {label}
      </Typography>
    </TouchableOpacity>
  )
}

export default SidebarItem
