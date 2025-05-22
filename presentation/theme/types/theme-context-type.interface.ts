import { IAppTheme } from '../app-theme.interface'
import { EThemeType } from './theme-type.enum'

export interface IThemeContextType {
  theme: IAppTheme
  themeType: EThemeType
  toggleTheme: () => void
}
