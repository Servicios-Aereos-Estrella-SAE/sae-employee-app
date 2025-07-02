import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Animated, {
  FadeInRight,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated'
import { Typography } from '../typography/typography.component'
import useSidebarItemStyles from './sidebar-item.style'
import { ISidebarItemProps } from './types/sidebar-item-props.interface'

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

/**
 * Item del sidebar
 * @param {ISidebarItemProps} props - Propiedades del item del sidebar
 * @returns {React.FC} Item del sidebar
 */
const SidebarItem: React.FC<ISidebarItemProps> = ({ 
  icon, 
  label, 
  labelStyle, 
  textColor, 
  onPress,
  delay = 0
}) => {
  const styles = useSidebarItemStyles()
  const scale = useSharedValue(1)

  const handlePressIn = () => {
    scale.value = withSpring(0.98, {
      duration: 100,
      dampingRatio: 0.8
    })
  }

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      duration: 150,
      dampingRatio: 0.8
    })
  }

  const handlePress = () => {
    if (onPress) {
      runOnJS(onPress)()
    }
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
    }
  })

  return (
    <Animated.View
      entering={FadeInRight.delay(delay).duration(200)}
    >
      <AnimatedTouchableOpacity 
        style={[styles.menuItem, animatedStyle]} 
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.7}
      >
        <View style={styles.menuIcon}>{icon}</View>
        <Typography variant="body" style={[styles.menuText, { color: textColor }, labelStyle]}>
          {label}
        </Typography>
      </AnimatedTouchableOpacity>
    </Animated.View>
  )
}

export default SidebarItem
