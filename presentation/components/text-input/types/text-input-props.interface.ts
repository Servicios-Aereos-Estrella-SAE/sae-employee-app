import { EKeyboardType } from './keyboard-type.enum'

/**
 * Propiedades del campo de texto
 * @interface ITextInputProps
 * @property {string} label - Etiqueta del campo de texto
 * @property {string} value - Valor del campo de texto
 * @property {Function} onChangeText - Función a ejecutar al cambiar el valor del campo de texto
 * @property {boolean} secureTextEntry - Indica si el campo de texto es de tipo seguro
 * @property {string} error - Mensaje de error del campo de texto
 * @property {keyof typeof EKeyboardType} keyboardType - Tipo de teclado del campo de texto
 * @property {string} leftIcon - Icono a la izquierda del campo de texto
 * @property {string} rightIcon - Icono a la derecha del campo de texto
 */
export interface ITextInputProps {
  label: string
  value: string
  onChangeText: (text: string) => void
  secureTextEntry?: boolean
  error?: string
  keyboardType?: keyof typeof EKeyboardType
  leftIcon?: string
  rightIcon?: string
}
