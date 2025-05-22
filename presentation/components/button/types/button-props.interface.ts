export interface IButtonProps {
  title: string
  onPress: () => void
  loading?: boolean
  mode?: 'text' | 'outlined' | 'contained'
  disabled?: boolean
  icon?: string
}
