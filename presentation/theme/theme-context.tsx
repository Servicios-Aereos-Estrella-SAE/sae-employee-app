/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { createContext, useContext, useEffect, useState } from 'react'
// import { SAE_EMPLOYEEAPP_THEME_STORAGE_KEY } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppState, AppStateStatus, useColorScheme } from 'react-native'
import { DARK_THEME } from './dark.theme'
import { LIGHT_THEME } from './light.theme'
import { IThemeContextType } from './types/theme-context-type.interface'
import { EThemeType } from './types/theme-type.enum'

const SAE_EMPLOYEEAPP_THEME_STORAGE_KEY = 'SAE_EMPLOYEEAPP_THEME_STORAGE_KEY'
const SAE_EMPLOYEEAPP_FIRST_LAUNCH_KEY = 'SAE_EMPLOYEEAPP_FIRST_LAUNCH_KEY'

// Create theme context with default value

const themeContext = createContext<IThemeContextType>({
  theme: LIGHT_THEME,
  themeType: EThemeType.LIGHT,
  toggleTheme: () => {},
  isFirstLaunch: true
})

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  // Get device color scheme
  const colorScheme = useColorScheme()
  const [themeType, setThemeType] = useState<EThemeType>(
    colorScheme === 'dark' ? EThemeType.DARK : EThemeType.LIGHT
  )
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean>(true)

  // Load saved theme preference
  const loadSavedTheme = async (): Promise<void> => {
    try {
      const savedTheme = await AsyncStorage.getItem(SAE_EMPLOYEEAPP_THEME_STORAGE_KEY)
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

  // Check if this is the first launch
  const checkFirstLaunch = async (): Promise<void> => {
    try {
      const hasLaunchedBefore = await AsyncStorage.getItem(SAE_EMPLOYEEAPP_FIRST_LAUNCH_KEY)
      if (hasLaunchedBefore === null) {
        // First launch
        setIsFirstLaunch(true)
        await AsyncStorage.setItem(SAE_EMPLOYEEAPP_FIRST_LAUNCH_KEY, 'false')
      } else {
        // Not first launch
        setIsFirstLaunch(false)
      }
    } catch (error) {
      console.error('Error checking first launch:', error)
      setIsFirstLaunch(false)
    }
  }

  // Save theme preference
  const saveThemePreference = async (theme: EThemeType): Promise<void> => {
    try {
      await AsyncStorage.setItem(SAE_EMPLOYEEAPP_THEME_STORAGE_KEY, theme)
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
    checkFirstLaunch()

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
    <themeContext.Provider value={{ theme, themeType, toggleTheme, isFirstLaunch }}>
      {children}
    </themeContext.Provider>
  )
}

// Custom hook to use theme
export const useAppTheme = (): IThemeContextType => useContext(themeContext)
