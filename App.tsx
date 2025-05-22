/* eslint-disable require-jsdoc */
 
import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import './src/shared/domain/i18n/i18n'
import { ThemeProvider, useAppTheme } from './presentation/theme/theme-context'
import { AppNavigator } from './navigation/app-navigator'

// Wrap everything in our theme provider
const ThemedApp: React.FC = () => {
  const { theme } = useAppTheme()
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
