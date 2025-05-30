/**
 * Propiedades del header
 * @interface IHeaderProps
 * @property {() => void} onMenuPress - Función a ejecutar al pulsar el botón de menú
 */
export default interface IHeaderProps {
  onMenuPress: () => void
}
