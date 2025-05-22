interface IAppTheme {
  dark: boolean
  colors: {
    primary: string
    accent: string
    background: string
    backgroundSecondary: string
    surface: string
    text: string
    textSecondary: string
    disabled: string
    placeholder: string
    backdrop: string
    notification: string
    border: string
    indicator: string
    indicatorActive: string
    button: string
    buttonText: string
    cardBgColor: string
  }
}

export type { IAppTheme }
