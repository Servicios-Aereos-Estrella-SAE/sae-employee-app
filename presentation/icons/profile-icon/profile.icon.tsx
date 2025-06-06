import Svg, { Path } from 'react-native-svg'

interface IProfileIconProps {
  size?: number
  color?: string
}

const ProfileIcon: React.FC<IProfileIconProps> = ({ size = 24, color = '#89a4bf' }) => (
  <Svg fill="none" viewBox="0 0 20 20" width={size} height={size}>
    <Path d="M10 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM7 6a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM5.009 11A2.001 2.001 0 0 0 3 13c0 1.691.833 2.966 2.135 3.797C6.417 17.614 8.145 18 10 18c1.855 0 3.583-.386 4.865-1.203C16.167 15.967 17 14.69 17 13a2 2 0 0 0-2-2H5.009ZM4 13c0-.553.448-1 1.009-1H15a1 1 0 0 1 1 1c0 1.309-.622 2.284-1.673 2.953C13.257 16.636 11.735 17 10 17c-1.735 0-3.257-.364-4.327-1.047C4.623 15.283 4 14.31 4 13Z" fill={color}></Path>
  </Svg>
)

export { ProfileIcon }
