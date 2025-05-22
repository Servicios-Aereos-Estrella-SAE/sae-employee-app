import React from 'react'
import { TextInput as PaperTextInput } from 'react-native-paper'
import { View, Text } from 'react-native'
import useTextInputStyles from './text-input.style'
import { ITextInputProps } from './types/text-input-props.interface'
import TextInputController from './text-input.controller'

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
  const controller = TextInputController()
  const styles = useTextInputStyles()

  return (
    <View style={styles.container}>
      <Text style={[styles.labelText]}>
        {label}
      </Text>

      <PaperTextInput
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry && !controller.passwordVisible}
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
              icon={controller.passwordVisible ? 'eye-off' : 'eye'}
              color={styles.textSecondaryColor.color}
              size={18}
              onPress={controller.togglePasswordVisibility}
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

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}
