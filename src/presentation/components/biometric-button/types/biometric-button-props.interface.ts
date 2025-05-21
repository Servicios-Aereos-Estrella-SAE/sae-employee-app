export interface IBiometricButtonProps {
  onPress: () => void
  type: 'fingerprint' | 'face'
  disabled?: boolean
}
