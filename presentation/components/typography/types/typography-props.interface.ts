import { TextProps, TextStyle } from 'react-native'

/**
 * Tipos de variantes de texto disponibles
 */
export type TypographyVariant = 
  | 'h1'           // Título principal
  | 'h2'           // Título secundario  
  | 'h3'           // Título terciario
  | 'body'        // Texto de cuerpo principal
  | 'body2'        // Texto de cuerpo secundario
  | 'caption'      // Texto pequeño/caption
  | 'overline'     // Texto de sobrelínea

/**
 * Interface para las propiedades del componente Typography
 */
export interface ITypographyProps extends Omit<TextProps, 'style'> {
  /** Variante del texto que determina el tamaño y estilo */
  variant?: TypographyVariant
  /** Contenido del texto */
  children: React.ReactNode
  /** Estilos adicionales */
  style?: TextStyle | TextStyle[]
  /** Color del texto (sobrescribe el color del tema) */
  color?: string
  /** Alineación del texto */
  textAlign?: 'left' | 'center' | 'right' | 'justify'
  /** Número máximo de líneas */
  numberOfLines?: number,
  /** Peso de la fuente */
  fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
} 
