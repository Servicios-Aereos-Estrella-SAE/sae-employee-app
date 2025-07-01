/* eslint-disable @typescript-eslint/no-unsafe-return */
import React from 'react'
import { Text } from 'react-native'
import { ITypographyProps } from './types/typography-props.interface'
import useTypographyStyle from './typography.style'

/**
 * Componente Typography para manejar diferentes tipos de texto de forma consistente
 * @param {ITypographyProps} props - Propiedades del componente
 * @returns {JSX.Element} Componente Typography
 */
const Typography: React.FC<ITypographyProps> = ({
  variant = 'body1',
  children,
  style,
  fontWeight,
  color,
  textAlign,
  numberOfLines,
  ...props
}) => {
  const styles = useTypographyStyle()
  const getVariantStyle = () => {
    return styles[variant as keyof typeof styles]
  }

  const combinedStyle = [
    getVariantStyle(),
    color && { color },
    textAlign && { textAlign },
    style,
    fontWeight && { fontWeight }
  ]

  return (
    <Text
      style={combinedStyle}
      numberOfLines={numberOfLines}
      {...props}
    >
      {children}
    </Text>
  )
}

export { Typography }

