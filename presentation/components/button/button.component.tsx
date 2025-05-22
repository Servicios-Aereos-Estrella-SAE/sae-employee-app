import { Button as PaperButton } from 'react-native-paper'
import useButtonStyles from './button.style'
import { IButtonProps } from './types/button-props.interface'

export const Button: React.FC<IButtonProps> = ({
  title,
  onPress,
  loading = false,
  mode = 'contained',
  disabled = false,
  icon
}) => {
  const styles = useButtonStyles()

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
          primary: styles.themePrimary.color
        }
      }}
      labelStyle={{ color: styles.labelStyle.color }}
      uppercase
    >
      {title}
    </PaperButton>
  )
}
