import React from 'react'
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native'
import { IconButton } from 'react-native-paper'
import useButtonStyles from './button.style'
import { IButtonProps } from './types/button-props.interface'

/**
 * Botón
 * @param {IButtonProps} props - Propiedades del botón
 * @returns {React.FC} Botón
 */
export const Button: React.FC<IButtonProps> = ({
  title,
  onPress,
  loading = false,
  mode = 'contained',
  disabled = false,
  icon
}) => {
  const styles = useButtonStyles(mode)

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        (disabled || loading) && styles.disabledButton
      ]}
      activeOpacity={0.7}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityHint={`Presiona para ${title.toLowerCase()}`}
      testID={`button-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <View style={styles.buttonContent}>
        {loading ? (
          <ActivityIndicator 
            size="small" 
            color={styles.labelStyle.color}
            style={styles.loadingIndicator}
          />
        ) : (
          <View style={styles.contentContainer}>
            {icon && (
              <IconButton 
                icon={icon} 
                size={20} 
                iconColor={styles.labelStyle.color}
                style={styles.iconStyle}
              />
            )}
            <Text style={[styles.labelStyle, styles.buttonText]}>
              {title}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}
