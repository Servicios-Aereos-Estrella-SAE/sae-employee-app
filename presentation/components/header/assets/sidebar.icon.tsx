import Svg, { Path } from 'react-native-svg'

const SidebarIcon = ({ color }: { color: string }) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24">
    <Path
      d="M3 17h12a1 1 0 0 1 .117 1.993L15 19H3a1 1 0 0 1-.117-1.993L3 17h12H3Zm0-6h18a1 1 0 0 1 .117 1.993L21 13H3a1 1 0 0 1-.117-1.993L3 11h18H3Zm0-6h15a1 1 0 0 1 .117 1.993L18 7H3a1 1 0 0 1-.117-1.993L3 5h15H3Z"
      fill={color}
    ></Path>
  </Svg>
)

export default SidebarIcon
