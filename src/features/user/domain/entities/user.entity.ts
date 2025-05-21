import { IUser } from '../types/user.interface'

/**
 * Entidad para representar un usuario.
 */
export class UserEntity {
  /**
   * Constructor de la entidad.
   * @param {IUser} properties - Propiedades del usuario.
   */
  constructor(private readonly properties: IUser) {}

  /**
   * Propiedades del usuario.
   * @returns {IUser} - Propiedades del usuario.
   */
  get props(): IUser {
    return this.properties
  }
}
