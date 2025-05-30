/**
 * Propiedades del botón
 * @interface IButtonProps
 * @property {string} title - Título del botón
 * @property {() => void} onPress - Función a ejecutar al pulsar el botón
 * @property {boolean} loading - Indica si el botón está en estado de carga
 * @property {'text' | 'outlined' | 'contained'} mode - Modo del botón
 * @property {boolean} disabled - Indica si el botón está deshabilitado
 * @property {string} icon - Icono del botón
 */
export interface IButtonProps {
  title: string
  onPress: () => void
  loading?: boolean
  mode?: 'text' | 'outlined' | 'contained'
  disabled?: boolean
  icon?: string
}
