/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import * as SecureStore from 'expo-secure-store'
import { AUTHENTICATION_KEY } from '@env'
import { AuthenticationEntity } from '../../domain/entities/authenticationEntity'
import i18next from 'i18next'

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
  async localStoreAuthentication(
    authenticationEntity: AuthenticationEntity
  ): Promise<void> {
    if (!authenticationEntity) {
      throw new Error(i18next.t('errors.authenticationEntityRequired'))
    }

    if (!authenticationEntity.props.authState?.isAuthenticated) {
      throw new Error(i18next.t('errors.invalidAuthenticationState'))
    }

    try {
      await this.safeSecureOperation(async () => {
        await SecureStore.setItemAsync(
          AUTHENTICATION_KEY,
          JSON.stringify(authenticationEntity)
        )
      }, undefined)
    } catch (error) {
      console.error(error)
      throw new Error(i18next.t('errors.authenticationStorageError'))
    }
  }

  /**
   * Obtiene la información de autenticación almacenada
   * @returns {Promise<AuthenticationEntity | null>} Información de autenticación o null si no existe
   */
  async localGetAuthenticationState(): Promise<AuthenticationEntity | null> {
    try {
      const authenticationStored = await this.getItemSafely(AUTHENTICATION_KEY)
      const authenticationObject = authenticationStored
        ? JSON.parse(authenticationStored)
        : null

      if (authenticationObject) {
        const authenticationEntity = new AuthenticationEntity({
          authState: authenticationObject.properties.authState,
          loginCredentials: authenticationObject.properties.loginCredentials,
          userName: authenticationObject.properties.userName
        })

        if (
          authenticationEntity &&
          authenticationEntity.props.authState?.isAuthenticated
        ) {
          return authenticationEntity
        }
      }

      await this.safeSecureOperation(
        () => SecureStore.deleteItemAsync(AUTHENTICATION_KEY),
        undefined
      )

      return null
    } catch (error) {
      console.error(error)
      await this.safeSecureOperation(
        () => SecureStore.deleteItemAsync(AUTHENTICATION_KEY),
        undefined
      )
    }

    return null
  }

  /**
   * ==========================================================================================================================
   * Funciones privadas
   * ==========================================================================================================================
   */

  /**
   * Ejecuta una operación de SecureStore de manera segura
   * @template T - Tipo de dato que devuelve la operación
   * @param {() => Promise<T>} operation - Función que realiza la operación de SecureStore
   * @param {T} defaultValue - Valor por defecto en caso de error
   * @returns {Promise<T>} Resultado de la operación o valor por defecto en caso de error
   * @private
   */
  private async safeSecureOperation<T>(
    operation: () => Promise<T>,
    defaultValue: T
  ): Promise<T> {
    try {
      return await operation()
    } catch (error) {
      console.error(error)
      return defaultValue
    }
  }

  /**
   * Obtiene un elemento del almacenamiento seguro de manera segura
   * @param {string} key - Clave del elemento a obtener
   * @returns {Promise<string | null>} Valor almacenado o null si no existe o hay error
   * @private
   */
  private async getItemSafely(key: string): Promise<string | null> {
    return await this.safeSecureOperation(
      () => SecureStore.getItemAsync(key),
      null
    )
  }
}
