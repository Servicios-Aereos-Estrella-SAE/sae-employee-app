export interface ITextInputProps {
  label: string
  value: string
  onChangeText: (text: string) => void
  secureTextEntry?: boolean
  error?: string
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad'
  leftIcon?: string
  rightIcon?: string
}
