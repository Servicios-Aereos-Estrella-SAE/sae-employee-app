import { StyleSheet } from 'react-native'
// import { IAppTheme } from '../theme/app-theme.interface'
// import { useAppTheme } from '../theme/ThemeContext'

const createAppNavigatorStyle = () => {
  return StyleSheet.create({
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5F8FF'
    }
  })
}

const useAppNavigatorStyle = () => {
  // const { theme } = useAppTheme()
  return createAppNavigatorStyle()
}

export default useAppNavigatorStyle
