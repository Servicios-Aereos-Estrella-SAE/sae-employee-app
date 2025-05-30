import Svg, { Path } from 'react-native-svg'

interface CheckInIconProps {
  size?: number
  color?: string
}

export const CheckInIcon: React.FC<CheckInIconProps> = ({
  size = 48,
  color = '#88a4bf'
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 5a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17Zm0 3a.75.75 0 0 0-.743.648l-.007.102v4.5l.007.102a.75.75 0 0 0 1.486 0l.007-.102v-4.5l-.007-.102A.75.75 0 0 0 12 8Zm7.17-2.877.082.061 1.149 1a.75.75 0 0 1-.904 1.193l-.081-.061-1.149-1a.75.75 0 0 1 .903-1.193ZM14.25 2.5a.75.75 0 0 1 .102 1.493L14.25 4h-4.5a.75.75 0 0 1-.102-1.493L9.75 2.5h4.5Z"
        fill={color}
      />
    </Svg>
  )
}
