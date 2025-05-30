import Svg, { Path } from 'react-native-svg'

export const SidebarIcon = ({ color }: { color: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 3a1 1 0 0 1 .993.883L13 4v16a1 1 0 0 1-1.993.117L11 20V4a1 1 0 0 1 1-1ZM8 6a1 1 0 0 1 .993.883L9 7v10a1 1 0 0 1-1.993.117L7 17V7a1 1 0 0 1 1-1Zm8 0a1 1 0 0 1 .993.883L17 7v10a1 1 0 0 1-1.993.117L15 17V7a1 1 0 0 1 1-1ZM4 9a1 1 0 0 1 .993.883L5 10v4a1 1 0 0 1-1.993.117L3 14v-4a1 1 0 0 1 1-1Zm16 0a1 1 0 0 1 .993.883L21 10v4a1 1 0 0 1-1.993.117L19 14v-4a1 1 0 0 1 1-1Z"
      fill={color}
    />
  </Svg>
)
