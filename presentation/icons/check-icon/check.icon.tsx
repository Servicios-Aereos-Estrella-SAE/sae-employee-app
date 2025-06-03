import Svg, { Path, SvgProps } from 'react-native-svg'

interface ICheckIconProps extends SvgProps {
  size: number
  color: string
}

export const CheckIcon: React.FC<ICheckIconProps> = ({ size = 24, color = '#88a4bf' }) => {
  return (
    <Svg fill="none" viewBox="0 0 24 24" height={size} width={size}>
      <Path d="m8.5 16.586-3.793-3.793a1 1 0 0 0-1.414 1.414l4.5 4.5a1 1 0 0 0 1.414 0l11-11a1 1 0 0 0-1.414-1.414L8.5 16.586Z" fill={color}/>
    </Svg>
  )
}
