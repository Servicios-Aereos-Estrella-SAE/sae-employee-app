import { BottomSheetView } from '@gorhom/bottom-sheet'
import { t } from 'i18next'
import React, { useCallback, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Button } from '../../components/button/button.component'
import { TextInput } from '../../components/text-input/text-input.component'
import { Typography } from '../../components/typography/typography.component'

interface PasswordBottomSheetProps {
  onPasswordSubmit: (password: string) => Promise<void>
  onCancel: () => void
  error?: string | null
}

export const PasswordBottomSheet: React.FC<PasswordBottomSheetProps> = ({
  onPasswordSubmit,
  onCancel,
  error
}) => {
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return
    
    setIsSubmitting(true)
    try {
      await onPasswordSubmit(password)
      setPassword('') // Limpiar el campo después del éxito
    } finally {
      setIsSubmitting(false)
    }
  }, [password, onPasswordSubmit, isSubmitting])

  const handleCancel = useCallback(() => {
    setPassword('')
    onCancel()
  }, [onCancel])

  const handlePasswordChange = useCallback((text: string) => {
    setPassword(text)
  }, [])

  return (
    <BottomSheetView style={{ padding: 24 }}>
      <TextInput
        label={t('screens.attendanceCheck.password')}
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry
        rightIcon="eye"
      />
      {error ? (
        <Typography variant="body2" style={{ color: 'red', marginTop: 8, textAlign: 'left' }}>{error}</Typography>
      ) : null}

      <Button
        title={t('screens.attendanceCheck.confirmButton')}
        onPress={handleSubmit}
        style={{ marginTop: 10 }}
        disabled={isSubmitting}
      />
      <TouchableOpacity
        style={{ alignItems: 'center', marginTop: 12 }}
        onPress={handleCancel}
        disabled={isSubmitting}
      >
        <Typography variant="body2" style={{ color: '#88a4bf', fontSize: 16 }}>
          {t('screens.attendanceCheck.cancelButton')}
        </Typography>
      </TouchableOpacity>
    </BottomSheetView>
  )
}
