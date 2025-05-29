/* eslint-disable require-jsdoc */
 
import React, { useEffect } from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { Alert } from 'react-native'
import './src/shared/domain/i18n/i18n'
import { ThemeProvider, useAppTheme } from './presentation/theme/theme-context'
import { AppNavigator } from './navigation/app-navigator'
import { ExpoUpdatesService } from './src/shared/infrastructure/services/expo-updates-service'

// Wrap everything in our theme provider
const ThemedApp: React.FC = () => {
  const { theme } = useAppTheme()

  useEffect(() => {
    // Check for updates when app loads
    ExpoUpdatesService.checkAndApplyUpdates((onReload) => {
      Alert.alert(
        'Actualización disponible',
        'Hay una nueva versión disponible. ¿Desea actualizar ahora?',
        [
          { text: 'Más tarde', style: 'cancel' },
          { text: 'Actualizar', onPress: onReload }
        ],
        { cancelable: false }
      )
    })
  }, [])

  return (
    <PaperProvider theme={theme}>
      <AppNavigator />
    </PaperProvider>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  )
}
