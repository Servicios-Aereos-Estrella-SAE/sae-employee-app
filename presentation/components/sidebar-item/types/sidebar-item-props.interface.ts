/**
 * Propiedades del item del sidebar
 * @interface ISidebarItemProps
 * @property {React.ReactNode} icon - Icono del item del sidebar
 * @property {string} label - Etiqueta del item del sidebar
 * @property {any} labelStyle - Estilos de la etiqueta del item del sidebar
 * @property {string} textColor - Color del texto del item del sidebar
 * @property {() => void} onPress - Función a ejecutar al pulsar el item del sidebar
 * @property {number} delay - Delay en milisegundos para la animación de entrada
 */
export interface ISidebarItemProps {
  icon: React.ReactNode
  label: string
  labelStyle?: any
  textColor?: string
  onPress?: () => void
  delay?: number
}
