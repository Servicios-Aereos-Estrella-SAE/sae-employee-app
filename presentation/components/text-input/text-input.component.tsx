import React, { useState } from 'react'
import { View } from 'react-native'
import { TextInput as PaperTextInput } from 'react-native-paper'
import { Typography } from '../typography/typography.component'
import useTextInputStyles from './text-input.style'
import { ITextInputProps } from './types/text-input-props.interface'

/**
 * Campo de texto
 * @param {ITextInputProps} props - Propiedades del campo de texto
 * @returns {React.FC} Campo de texto
 */
export const TextInput: React.FC<ITextInputProps> = ({
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
  const styles = useTextInputStyles()

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  return (
    <View style={styles.container}>
      <Typography variant="body2" style={[styles.labelText]}>
        {label}
      </Typography>

      <PaperTextInput
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry && !passwordVisible}
        error={!!error}
        keyboardType={keyboardType}
        style={[styles.input]}
        mode="outlined"
        placeholder=""
        placeholderTextColor="transparent"
        theme={{
          colors: {
            primary: styles.primaryColor.color,
            background: styles.backgroundColor.color,
            placeholder: styles.placeholderColor.color,
            text: styles.textColor.color
          },
          roundness: 25
        }}
        outlineStyle={[styles.outline]}
        left={
          leftIcon ? (
            <PaperTextInput.Icon
              icon={leftIcon}
              color={styles.textSecondaryColor.color}
              size={18}
            />
          ) : undefined
        }
        right={
          rightIcon && secureTextEntry ? (
            <PaperTextInput.Icon
              icon={passwordVisible ? 'eye-off' : 'eye'}
              color={styles.textSecondaryColor.color}
              size={18}
              onPress={togglePasswordVisibility}
            />
          ) : rightIcon ? (
            <PaperTextInput.Icon
              icon={rightIcon}
              color={styles.textSecondaryColor.color}
              size={18}
            />
          ) : undefined
        }
      />

      {error && <Typography variant="caption" style={styles.errorText}>{error}</Typography>}
    </View>
  )
}
