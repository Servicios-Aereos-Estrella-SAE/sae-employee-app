import Svg, { Path } from 'react-native-svg'

interface ILogoutIconProps {
  size?: number
  color?: string
}

export const LogoutIcon: React.FC<ILogoutIconProps> = ({ size = 24, color = '#cd360c' }) => (
  <Svg fill="none" width={size} height={size} viewBox="0 0 20 20">
    <Path d="M10.5 2.5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0v-6Z" fill={color}></Path>
    <Path d="M13.743 4a.5.5 0 1 0-.499.867 6.5 6.5 0 1 1-6.494.004.5.5 0 1 0-.5-.866A7.5 7.5 0 1 0 13.743 4Z" fill={color}></Path>
  </Svg>
)
