import { EmailVO } from '../../../../shared/domain/value-objects/email.vo'
import { IntegerIdVO } from '../../../../shared/domain/value-objects/integer-id.vo'
import { EmployeeEntity } from '../../../employee/domain/entiities/employee.entity'

/**
 * Interfaz que define una persona.
 * @interface IPerson
 * @property {IntegerIdVO | null} id - El ID de la persona.
 * @property {string} firstname - El nombre de la persona.
 * @property {string} lastname - El apellido de la persona.
 * @property {string} secondLastname - El segundo apellido de la persona.
 * @property {string | null} phone - El teléfono de la persona.
 * @property {EmailVO | null} email - El correo electrónico de la persona.
 * @property {string | null} gender - El género de la persona.
 * @property {Date | string | null} birthday - La fecha de nacimiento de la persona.
 * @property {string | null} curp - El CURP de la persona.
 * @property {string | null} rfc - El RFC de la persona.
 * @property {string | null} imssNss - El NSS de la persona.
 * @property {string | null} phoneSecondary - El teléfono secundario de la persona.
 * @property {string | null} maritalStatus - El estado civil de la persona.
 * @property {string | null} placeOfBirthCountry - El país de nacimiento de la persona.
 * @property {string | null} placeOfBirthState - El estado de nacimiento de la persona.
 * @property {string | null} placeOfBirthCity - La ciudad de nacimiento de la persona.
 * @property {Date | string | null} createdAt - La fecha de creación de la persona.
 * @property {Date | string | null} updatedAt - La fecha de actualización de la persona.
 * @property {Date | string | null} deletedAt - La fecha de eliminación de la persona.
 * @property {EmployeeEntity | undefined} employee - El empleado asociado a la persona.
 */
export interface IPerson {
  id: IntegerIdVO | null
  firstname: string
  lastname: string
  secondLastname: string
  phone: string | null
  email: EmailVO | null
  gender: string | null
  birthday: Date | string | null
  curp: string | null
  rfc: string | null
  imssNss: string | null
  phoneSecondary: string | null
  maritalStatus: string | null
  placeOfBirthCountry: string | null
  placeOfBirthState: string | null
  placeOfBirthCity: string | null
  createdAt: Date | string | null
  updatedAt: Date | string | null
  deletedAt: Date | string | null

  employee?: EmployeeEntity
}
