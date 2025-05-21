/* eslint-disable require-jsdoc */
 
import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { AppNavigator } from './src/presentation/navigation/app-navigator'
import {
  ThemeProvider,
  useAppTheme
} from './src/presentation/theme/theme-context'
import './src/shared/domain/i18n/i18n'

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
