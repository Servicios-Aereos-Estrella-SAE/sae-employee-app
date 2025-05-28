/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import * as SecureStore from 'expo-secure-store'
import { AUTHENTICATION_KEY, AUTHENTICATION_USER_KEY } from '@env'
import { AuthenticationEntity } from '../../domain/entities/authentication-entity'
import i18next from 'i18next'
import { IAuthentication } from '../../domain/types/authentication.interface'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IEmployee } from '../../../employee/domain/types/employee.interface'
import { IUser } from '../../../user/domain/types/user.interface'
import { IPerson } from '../../../person/domain/types/person.interface'
import { EmployeeEntity } from '../../../employee/domain/entiities/employee.entity'
import { PersonEntity } from '../../../person/domain/entities/person.entity'
import { UserEntity } from '../../../user/domain/entities/user.entity'

/**
 * Clase para gestionar el almacenamiento seguro de información del usuario
 * @class UserStorage
 */
export class AuthenticationLocalStorageService {
  /**
   * Guarda las credenciales de inicio de sesión
   * @param {AuthenticationEntity} authenticationEntity - Objeto AuthenticationEntity
   * @throws {Error} Si hay un error al guardar la información de autenticación
   * @returns {Promise<void>}
   */
  async localStoreAuthenticationCredentials(authenticationEntity: AuthenticationEntity): Promise<void> {
    if (!authenticationEntity) {
      throw new Error(i18next.t('errors.authenticationEntityRequired'))
    }

    if (!authenticationEntity.props.authState?.isAuthenticated) {
      throw new Error(i18next.t('errors.invalidAuthenticationState'))
    }

    const secureAuthenticationCredentials: IAuthentication = {
      loginCredentials: {
        email: authenticationEntity.props.loginCredentials?.email || '',
        password: authenticationEntity.props.loginCredentials?.password || ''
      },
      createdAt: authenticationEntity.props.createdAt || new Date()
    }

    try {
      await SecureStore.setItemAsync(
        AUTHENTICATION_KEY,
        JSON.stringify(secureAuthenticationCredentials)
      )
    } catch (error) {
      console.error(error)
      throw new Error(i18next.t('errors.authenticationStorageError'))
    }
  }

  /**
   * Guarda el estado de autenticación del usuario
   * @param {AuthenticationEntity} authenticationEntity - Objeto AuthenticationEntity
   * @throws {Error} Si hay un error al guardar el estado de autenticación
   * @returns {Promise<void>}
   */
  async localStoreAuthenticationState(authenticationEntity: AuthenticationEntity): Promise<void> {
    if (!authenticationEntity) {
      throw new Error(i18next.t('errors.authenticationEntityRequired'))
    }

    if (!authenticationEntity.props.authState?.isAuthenticated) {
      throw new Error(i18next.t('errors.invalidAuthenticationState'))
    }

    const secureAuthState: IAuthentication = {
      ...JSON.parse(JSON.stringify(authenticationEntity.props)),
      loginCredentials: {
        email: authenticationEntity.props.loginCredentials?.email,
        password: ''
      }
    }

    const secureAuthenticationEntity = new AuthenticationEntity(secureAuthState)

    try {
      await AsyncStorage.setItem(
        AUTHENTICATION_USER_KEY,
        JSON.stringify(secureAuthenticationEntity)
      )
    } catch (error) {
      console.error(error)
      throw new Error(i18next.t('errors.authenticationStorageError'))
    }
  }

  /**
   * Obtiene la información de autenticación almacenada
   * @returns {Promise<AuthenticationEntity | null>} Información de autenticación  o null si no existe
   */
  async localGetAuthenticationState(): Promise<AuthenticationEntity | null> {
    try {
      const authenticationStored = await AsyncStorage.getItem(AUTHENTICATION_USER_KEY)
      const authenticationObject = authenticationStored ? JSON.parse(authenticationStored) : null

      if (authenticationObject) {
        const responseEmployee = authenticationObject.properties.authState?.user?.properties?.person?.properties?.employee?.properties as IEmployee
        const employee = new EmployeeEntity(responseEmployee)

        const responsePerson: IPerson = {
          ...JSON.parse(JSON.stringify(authenticationObject.properties.authState?.user?.properties?.person?.properties)),
          employee: employee
        }

        const person = new PersonEntity(responsePerson)

        const responseUser: IUser = {
          ...JSON.parse(JSON.stringify(authenticationObject.properties.authState?.user?.properties)),
          person
        }

        const user = new UserEntity(responseUser)

        const authenticationEntity = new AuthenticationEntity({
          authState: {
            ...JSON.parse(JSON.stringify(authenticationObject.properties.authState)),
            user: user
          },
          loginCredentials: authenticationObject.properties.loginCredentials,
          createdAt: authenticationObject.properties.createdAts
        })

        if (
          authenticationEntity &&
          authenticationEntity.props.authState?.isAuthenticated
        ) {
          return authenticationEntity
        }
      }

      await SecureStore.deleteItemAsync(AUTHENTICATION_KEY)
      await AsyncStorage.removeItem(AUTHENTICATION_USER_KEY)

      return null
    } catch (error) {
      console.error(error)
      await SecureStore.deleteItemAsync(AUTHENTICATION_KEY)
      await AsyncStorage.removeItem(AUTHENTICATION_USER_KEY)
    }

    return null
  }

  /**
   * Obtiene las credenciales de autenticación del usuario desde el almacenamiento local en el dispositivo
   * @returns {Promise<AuthenticationEntity | null>} Promesa que resuelve a la entidad de autenticación con los datos de sesión o null si no existe
   */
  async localGetAuthenticationCredentials(): Promise<AuthenticationEntity | null> {
    try {
      const authenticationStored = await SecureStore.getItemAsync(AUTHENTICATION_KEY)
      const authenticationCredentials = authenticationStored ? JSON.parse(authenticationStored) : null

      if (authenticationCredentials) {
        const authenticationEntity = new AuthenticationEntity({
          loginCredentials: authenticationCredentials.loginCredentials,
          createdAt: authenticationCredentials.createdAt
        })

        if (authenticationEntity) {
          return authenticationEntity
        }
      }

      await SecureStore.deleteItemAsync(AUTHENTICATION_KEY)
      await AsyncStorage.removeItem(AUTHENTICATION_USER_KEY)

      return null
    } catch (error) {
      console.error(error)
      await SecureStore.deleteItemAsync(AUTHENTICATION_KEY)
      await AsyncStorage.removeItem(AUTHENTICATION_USER_KEY)
    }

    return null
  }

  /**
   * ==========================================================================================================================
   * Funciones privadas
   * ==========================================================================================================================
   */
}
