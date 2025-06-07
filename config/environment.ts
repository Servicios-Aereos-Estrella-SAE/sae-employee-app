import Constants from 'expo-constants'

import {
  SAE_EMPLOYEEAPP_API_URL,
  SAE_EMPLOYEEAPP_AUTHENTICATION_KEY,
  SAE_EMPLOYEEAPP_AUTHENTICATION_USER_KEY,
  SAE_EMPLOYEEAPP_THEME_STORAGE_KEY
} from '@env'

interface IEnvironment {
  apiUrl: string
  authenticationKey: string
  authenticationUserKey: string
  themeStorageKey: string
}

const developmentEnvironment: IEnvironment = {
  apiUrl: (SAE_EMPLOYEEAPP_API_URL || 'http://localhost:3333') as string,
  authenticationKey: (SAE_EMPLOYEEAPP_AUTHENTICATION_KEY || 'NO AUTHENTICATION KEY') as string,
  authenticationUserKey: (SAE_EMPLOYEEAPP_AUTHENTICATION_USER_KEY || 'NO AUTHENTICATION USER KEY') as string,
  themeStorageKey: (SAE_EMPLOYEEAPP_THEME_STORAGE_KEY || 'NO THEME STORAGE KEY') as string
}

const previewEnvironment: IEnvironment = {
  apiUrl: (Constants.expoConfig?.extra?.SAE_EMPLOYEEAPP_API_URL || '') as string,
  authenticationKey: (Constants.expoConfig?.extra?.SAE_EMPLOYEEAPP_AUTHENTICATION_KEY || '') as string,
  authenticationUserKey: (Constants.expoConfig?.extra?.SAE_EMPLOYEEAPP_AUTHENTICATION_USER_KEY || '') as string,
  themeStorageKey: (Constants.expoConfig?.extra?.SAE_EMPLOYEEAPP_THEME_STORAGE_KEY || '') as string
}

const environment = Constants.expoConfig?.extra?.env === 'preview' ? previewEnvironment : developmentEnvironment

export { environment }
