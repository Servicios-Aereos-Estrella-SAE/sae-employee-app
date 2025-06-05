import Svg, { Path } from 'react-native-svg'

interface ITranslateIconProps {
  size?: number
  color?: string
}

const TranslateIcon: React.FC<ITranslateIconProps> = ({ size = 24, color = '#89a4bf' }) => (
  <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
    <Path d="M9.5 1.996a.5.5 0 0 0 0 1H13v1.869C13 6.03 11.832 7 10.5 7a.5.5 0 0 0 0 1C12.21 8 14 6.742 14 4.865V2.496a.5.5 0 0 0-.5-.5h-4ZM7.961 5.307a.5.5 0 0 0-.923 0l-5 12a.5.5 0 1 0 .923.385l1.537-3.69H10.5l1.539 3.695a.5.5 0 1 0 .923-.385l-1.662-3.99a.552.552 0 0 0-.01-.022L7.963 5.307Zm2.122 7.696H4.915L7.5 6.8l2.584 6.203ZM15.5 1.996a.5.5 0 0 1 .5.5v3.505H17.5a.5.5 0 0 1 0 1H16v6.495a.5.5 0 1 1-1 0v-11a.5.5 0 0 1 .5-.5Z" fill={color}></Path>
  </Svg>
)

export { TranslateIcon }

