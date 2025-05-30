import { EBiometricType } from './biometric-type.enum'

/**
 * Propiedades del botón de biometría
 * @interface IBiometricButtonProps
 * @property {() => void} onPress - Función a ejecutar al pulsar el botón de biometría
 * @property {keyof typeof EBiometricType} type - Tipo de biometría
 * @property {boolean} disabled - Indica si el botón de biometría está deshabilitado
 */
export interface IBiometricButtonProps {
  onPress: () => void
  type: keyof typeof EBiometricType
  disabled?: boolean
}
