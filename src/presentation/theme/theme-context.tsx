import React, { createContext, useContext, useEffect, useState } from 'react'
import { THEME_STORAGE_KEY } from '@env'
import { useColorScheme, AppState, AppStateStatus } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { EThemeType } from './types/theme-type.enum'
import { LIGHT_THEME } from './light.theme'
import { DARK_THEME } from './dark.theme'
import { IThemeContextType } from './types/theme-context-type.interface'

// Create theme context with default value

const themeContext = createContext<IThemeContextType>({
  theme: LIGHT_THEME,
  themeType: EThemeType.LIGHT,
  toggleTheme: () => {}
})

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  // Get device color scheme
  const colorScheme = useColorScheme()
  const [themeType, setThemeType] = useState<EThemeType>(
    colorScheme === 'dark' ? EThemeType.DARK : EThemeType.LIGHT
  )

  // Load saved theme preference
  const loadSavedTheme = async (): Promise<void> => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY)
      if (savedTheme !== null) {
        setThemeType(savedTheme as EThemeType)
      } else {
        // If no saved theme, use device theme
        setThemeType(
          colorScheme === 'dark' ? EThemeType.DARK : EThemeType.LIGHT
        )
      }
    } catch (error) {
      console.error('Error loading theme preference:', error)
      // Fallback to device theme
      setThemeType(colorScheme === 'dark' ? EThemeType.DARK : EThemeType.LIGHT)
    }
  }

  // Save theme preference
  const saveThemePreference = async (theme: EThemeType): Promise<void> => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch (error) {
      console.error('Error saving theme preference:', error)
    }
  }

  // Handle app state changes (for detecting theme changes when app returns from background)
  const handleAppStateChange = (nextAppState: AppStateStatus): void => {
    if (nextAppState === 'active') {
      // Load saved theme when app becomes active
      loadSavedTheme()
    }
  }

  // Set theme based on saved preference or device theme by default
  useEffect(() => {
    loadSavedTheme()

    // Add app state change listener
    const appStateSubscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    )

    // Clean up
    return (): void => {
      appStateSubscription.remove()
    }
     
  }, [])

  // Toggle theme function (for manual switching)
  const toggleTheme = (): void => {
    setThemeType((prevTheme) => {
      const newTheme =
        prevTheme === EThemeType.LIGHT ? EThemeType.DARK : EThemeType.LIGHT
      saveThemePreference(newTheme)
      return newTheme
    })
  }

  // Get current theme object
  const theme = themeType === 'dark' ? DARK_THEME : LIGHT_THEME

  return (
    <themeContext.Provider value={{ theme, themeType, toggleTheme }}>
      {children}
    </themeContext.Provider>
  )
}

// Custom hook to use theme
export const useAppTheme = (): IThemeContextType => useContext(themeContext)
