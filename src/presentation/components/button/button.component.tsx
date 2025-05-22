import { Button as PaperButton } from 'react-native-paper'
import { Dimensions, StyleSheet } from 'react-native'
import { useAppTheme } from '../../theme/theme-context'

const { height } = Dimensions.get('window')

interface ButtonProps {
  title: string
  onPress: () => void
  loading?: boolean
  mode?: 'text' | 'outlined' | 'contained'
  disabled?: boolean
  icon?: string
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  loading = false,
  mode = 'contained',
  disabled = false,
  icon
}) => {
  const { theme } = useAppTheme()

  return (
    <PaperButton
      mode={mode}
      onPress={onPress}
      loading={loading}
      disabled={disabled}
      icon={icon}
      style={styles.button}
      contentStyle={styles.buttonContent}
      theme={{
        colors: {
          primary: theme.colors.primary
        }
      }}
      labelStyle={{ color: theme.colors.buttonText }}
      uppercase
    >
      {title}
    </PaperButton>
  )
}

const styles = StyleSheet.create({
  button: {},
  buttonContent: {
    height: height * 0.05
  }
})
