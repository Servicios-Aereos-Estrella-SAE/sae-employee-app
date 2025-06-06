import Svg, { Path } from 'react-native-svg'

interface IClockIconProps {
  size?: number
  color?: string
}

const ClockIcon: React.FC<IClockIconProps> = ({ size = 24, color = '#89a4bf' }) => (
  <Svg fill="none" viewBox="0 0 20 20" width={size} height={size}>
    <Path d="M10 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm0 1a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm-.5 2a.5.5 0 0 1 .492.41L10 5.5V10h2.5a.5.5 0 0 1 .09.992L12.5 11h-3a.5.5 0 0 1-.492-.41L9 10.5v-5a.5.5 0 0 1 .5-.5Z" fill={color}></Path>
  </Svg>
)

export { ClockIcon }
