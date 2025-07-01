import { Dimensions, StyleSheet } from 'react-native'
import { useAppTheme } from '../../theme/theme-context'
import { TypographyVariant } from './types/typography-props.interface'

const { width } = Dimensions.get('window')
const sp = (size: number) => (width / 375) * size

/**
 * Función que crea los estilos para el componente Typography
 * @param {Object} theme - Tema actual de la aplicación
 * @returns {Object} Estilos del componente Typography
 */
const createTypographyStyle = (theme: any) => {
  const baseStyle = {
    color: theme.colors.text,
    fontFamily: 'System' // Puedes cambiar esto por tu fuente personalizada
  }

  return StyleSheet.create({
    h1: {
      ...baseStyle,
      fontSize: sp(16),
      fontWeight: 'bold'
    },
    h2: {
      ...baseStyle,
      fontSize: sp(14),
      fontWeight: 'bold'
    },
    h3: {
      ...baseStyle,
      fontSize: sp(12),
      fontWeight: '600'
    },
    body: {
      ...baseStyle,
      fontSize: sp(12),
      fontWeight: 'normal'
    },
    body2: {
      ...baseStyle,
      fontSize: sp(10),
      fontWeight: 'normal'
    },
    caption: {
      ...baseStyle,
      fontSize: sp(9),
      fontWeight: 'normal',
      opacity: 0.6
    },
    overline: {
      ...baseStyle,
      fontSize: sp(9),
      fontWeight: '500',
      textTransform: 'uppercase',
      letterSpacing: 0.5
    }
  } as Record<TypographyVariant, any>)
}

/**
 * Hook personalizado que retorna los estilos del componente Typography
 * @returns {Object} Estilos del componente Typography
 */
const useTypographyStyle = () => {
  const { theme } = useAppTheme()
  return createTypographyStyle(theme)
}

export default useTypographyStyle 
