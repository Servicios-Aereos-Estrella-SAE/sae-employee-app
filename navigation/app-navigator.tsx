import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ActivityIndicator, View } from 'react-native'
import { RootStackParamList } from './types/types'
import AppNavigatorController from './app-navigator.controller'
import useAppNavigatorStyle from './app-navigator.style'

import { AuthenticationScreen } from '../presentation/screens/authentication/authentication.screen'
import { AttendanceCheckScreen } from '../presentation/screens/attendance-check/attendance-check.screen'
// import { ProfileScreen } from '../screens/profile/ProfileScreen'

const Stack = createNativeStackNavigator<RootStackParamList>()

export const AppNavigator: React.FC = () => {
  const controller = AppNavigatorController()
  const styles = useAppNavigatorStyle()

  if (controller.isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#003366" />
      </View>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={controller.getInitialRouteName()}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="authenticationScreen"
          component={AuthenticationScreen}
        />
        <Stack.Screen
          name="attendanceCheck"
          component={AttendanceCheckScreen}
        />
        {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
