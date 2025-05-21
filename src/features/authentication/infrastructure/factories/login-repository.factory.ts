/* eslint-disable indent */
import { LoginAPIRepository } from '../repositories/login-api/login-api.repository'
import { LoginBiometricRepository } from '../repositories/login-biometric/login-biometric.repository'
import i18next from 'i18next'
import { ELoginTypes } from '../../application/types/login-types.enum'

/**
 * Factory para crear instancias de repositorios de autenticación
 * @class LoginRepositoryFactory
 */
export class LoginRepositoryFactory {
  /**
   * Crea una instancia del repositorio de autenticación según el tipo especificado
   * @param {LoginTypes} type - Tipo de repositorio a crear
   * - 'email' para el repositorio de autenticación con correo electrónico y contraseña
   * - 'biometric' para el repositorio de autenticación con biometría
   * @returns {LoginAPIRepository | LoginBiometricRepository} Instancia del repositorio de autenticación
   * @throws {Error} Si el tipo de repositorio no es válido
   */
  repository(type: ELoginTypes): LoginAPIRepository | LoginBiometricRepository {
    switch (type) {
      case ELoginTypes.EMAIL:
        return new LoginAPIRepository()
      case ELoginTypes.BIOMETRIC:
        return new LoginBiometricRepository()
      default:
        throw new Error(i18next.t('errors.invalidLoginType'))
    }
  }
}
