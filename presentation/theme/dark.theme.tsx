import { IAppTheme } from './app-theme.interface'
import { MD3DarkTheme } from 'react-native-paper'

export const DARK_THEME: IAppTheme = {
  ...MD3DarkTheme,
  dark: true,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#93a5de',
    accent: '#34d4ad',
    background: '#252f4a',
    backgroundSecondary: '#1e1e1e',
    surface: '#3d476a',
    text: '#e1e1e1',
    textSecondary: '#a0a0a0',
    disabled: '#666666',
    placeholder: '#666666',
    backdrop: MD3DarkTheme.colors.backdrop,
    notification: '#ff4500',
    border: '#3d476a',
    indicator: '#3d4869',
    indicatorActive: '#3d4769',
    button: '#34d4ad',
    buttonText: '#ffffff',
    cardBgColor: '#2b3652',
    iconColor: '#89a4bf'
  }
}
