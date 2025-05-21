import React, { useState } from 'react'
import { TextInput as PaperTextInput } from 'react-native-paper'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import { useAppTheme } from '../../theme/theme-context'
const { height } = Dimensions.get('window')

interface TextInputProps {
  label: string
  value: string
  onChangeText: (text: string) => void
  secureTextEntry?: boolean
  error?: string
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad'
  leftIcon?: string
  rightIcon?: string
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  error,
  keyboardType = 'default',
  leftIcon,
  rightIcon
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const { theme } = useAppTheme()

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  return (
    <View style={styles.container}>
      {/* Label fijo en la parte superior */}
      <Text style={[styles.labelText, { color: theme.colors.text }]}>
        {label}
      </Text>

      {/* Input con modo flat para evitar la animación del label */}
      <PaperTextInput
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry && !passwordVisible}
        error={!!error}
        keyboardType={keyboardType}
        style={[styles.input, { backgroundColor: theme.colors.surface }]}
        mode="outlined"
        placeholder=""
        placeholderTextColor="transparent"
        theme={{
          colors: {
            primary: theme.colors.primary,
            background: theme.colors.surface,
            placeholder: theme.colors.placeholder,
            text: theme.colors.text
          },
          roundness: 25
        }}
        outlineStyle={[styles.outline, { borderColor: theme.colors.border }]}
        left={
          leftIcon ? (
            <PaperTextInput.Icon
              icon={leftIcon}
              color={theme.colors.textSecondary}
              size={18}
            />
          ) : undefined
        }
        right={
          rightIcon && secureTextEntry ? (
            <PaperTextInput.Icon
              icon={passwordVisible ? 'eye-off' : 'eye'}
              color={theme.colors.textSecondary}
              size={18}
              onPress={togglePasswordVisibility}
            />
          ) : rightIcon ? (
            <PaperTextInput.Icon
              icon={rightIcon}
              color={theme.colors.textSecondary}
              size={18}
            />
          ) : undefined
        }
      />

      {/* Mensaje de error si existe */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  },
  labelText: {
    color: '#303e67',
    fontSize: 14,
    marginBottom: 4,
    fontWeight: '500',
    paddingLeft: 12
  },
  input: {
    backgroundColor: '#ffffff',
    height: height * 0.055,
    paddingHorizontal: 5
  },
  outline: {
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#e2ebf6'
  },
  errorText: {
    color: '#FF0000',
    fontSize: 12,
    marginTop: 4,
    paddingLeft: 12
  }
})
