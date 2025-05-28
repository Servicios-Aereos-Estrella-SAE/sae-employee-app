import { EmployeeApiDTO } from '../../../employee/domain/entiities/employee-api.dto'
import { PersonApiDTO } from '../../../person/domain/entities/person-api.dto'

/**
 * Interfaz que define un usuario API.
 * @interface UserApiDTO
 * @property {number | null} userId - El ID del usuario.
 * @property {string} userEmail - El correo electrónico del usuario.
 * @property {string} userPassword - La contraseña del usuario.
 * @property {number} userActive - El estado activo del usuario.
 * @property {string | null} userToken - El token del usuario.
 * @property {Date | null} pinCodeExpiresAt - La fecha de expiración del código PIN.
 * @property {number | null} personId - El ID de la persona del usuario.
 * @property {number | null} roleId - El ID del rol del usuario.
 * @property {string} businessAccess - El acceso a la empresa.
 * @property {string} userCreatedAt - La fecha de creación del usuario.
 * @property {string} userUpdatedAt - La fecha de actualización del usuario.
 * @property {string | null} deletedAt - La fecha de eliminación del usuario.
 * @property {PersonApiDTO | undefined} person - La persona del usuario.
 * @property {EmployeeApiDTO | undefined} employee - El empleado del usuario.
 */
export interface UserApiDTO {
  userId: number | null
  userEmail: string
  userPassword: string
  userActive: number
  userToken: string | null
  pinCodeExpiresAt: Date | null
  personId: number | null
  roleId: number | null
  businessAccess: string,
  userCreatedAt: string
  userUpdatedAt: string
  deletedAt: string | null
  person?: PersonApiDTO
  employee?: EmployeeApiDTO
  // role?: RoleApiDTO
}
