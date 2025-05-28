import { ActiveVO } from '../../../../shared/domain/value-objects/active.vo'
import { EmailVO } from '../../../../shared/domain/value-objects/email.vo'
import { IntegerIdVO } from '../../../../shared/domain/value-objects/integer-id.vo'
import { PersonEntity } from '../../../person/domain/entities/person.entity'

/**
 * Interfaz que define un usuario.
 * @interface IUser
 * @property {IntegerIdVO | null} id - El ID del usuario.
 * @property {EmailVO} email - El correo electrónico del usuario.
 * @property {string} password - La contraseña del usuario.
 * @property {string | null} token - El token del usuario.
 * @property {string | null} pinCode - El código PIN del usuario.
 * @property {ActiveVO} active - El estado activo del usuario.
 * @property {IntegerIdVO | null} personId - El ID de la persona asociada al usuario.
 * @property {IntegerIdVO | null} roleId - El ID del rol asociado al usuario.
 * @property {Date | null} pinCodeExpiresAt - La fecha de expiración del código PIN.
 * @property {string | null} businessAccess - El acceso a la empresa.
 * @property {Date | null} createdAt - La fecha de creación del usuario.
 * @property {Date | null} updatedAt - La fecha de actualización del usuario.
 * @property {Date | null} deletedAt - La fecha de eliminación del usuario.
 * @property {PersonEntity | undefined} person - La persona asociada al usuario.
 */
export interface IUser {
  readonly id: IntegerIdVO | null
  readonly email: EmailVO
  readonly password: string
  readonly token: string | null
  readonly pinCode: string | null
  readonly active: ActiveVO
  readonly personId: IntegerIdVO | null
  readonly roleId: IntegerIdVO | null
  readonly pinCodeExpiresAt: Date | null
  readonly businessAccess: string | null
  readonly createdAt: Date | null
  readonly updatedAt: Date | null
  readonly deletedAt: Date | null

  readonly person?: PersonEntity
}
