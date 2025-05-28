import { EmailVO } from '../../../../shared/domain/value-objects/email.vo'
import { IntegerIdVO } from '../../../../shared/domain/value-objects/integer-id.vo'

/**
 * Interfaz que define un empleado.
 * @interface IEmployee
 * @property {IntegerIdVO | null} id - El ID del empleado.
 * @property {string} syncId - El ID de sincronización del empleado.
 * @property {string} code - El código del empleado.
 * @property {string} firstName - El nombre del empleado.
 * @property {string} lastName - El apellido del empleado.
 * @property {string | null} payrollNum - El número de nómina del empleado.
 * @property {Date | null} hireDate - La fecha de contratación del empleado.
 * @property {IntegerIdVO | null} companyId - El ID de la empresa del empleado.
 * @property {IntegerIdVO | null} departmentId - El ID del departamento del empleado.
 * @property {IntegerIdVO | null} positionId - El ID de la posición del empleado.
 * @property {string} departmentSyncId - El ID de sincronización del departamento del empleado.
 * @property {string} positionSyncId - El ID de sincronización de la posición del empleado.
 * @property {string | null} photo - La foto del empleado.
 * @property {string | null} workSchedule - El horario de trabajo del empleado.
 * @property {IntegerIdVO | null} personId - El ID de la persona del empleado.
 * @property {IntegerIdVO | null} businessUnitId - El ID de la unidad de negocio del empleado.
 * @property {IntegerIdVO | null} payrollBusinessUnitId - El ID de la unidad de negocio de nómina del empleado.
 * @property {number} assistDiscriminator - El discriminador de asistencia del empleado.
 * @property {Date | null} lastSynchronizationAt - La fecha de última sincronización del empleado.
 * @property {string | null} typeOfContract - El tipo de contrato del empleado.
 * @property {Date | null} terminatedDate - La fecha de terminación del empleado.
 * @property {IntegerIdVO | null} typeId - El ID del tipo de empleado.
 * @property {EmailVO | null} businessEmail - El correo electrónico del empleado.
 * @property {number} ignoreConsecutiveAbsences - El número de ausencias consecutivas ignoradas.
 * @property {Date | null} createdAt - La fecha de creación del empleado.
 * @property {Date | null} updatedAt - La fecha de actualización del empleado.
 * @property {Date | null} deletedAt - La fecha de eliminación del empleado.
 * @property {boolean | undefined} userResponsibleEmployeeChecked - Indica si el usuario es responsable del empleado.
 * @property {boolean | undefined} userResponsibleEmployeeReadonly - Indica si el usuario es responsable del empleado.
 * @property {boolean | undefined} userResponsibleEmployeeDirectBoss - Indica si el usuario es responsable del empleado.
 */
export interface IEmployee {
  id: IntegerIdVO | null
  syncId: string
  code: string
  firstName: string
  lastName: string
  payrollNum: string | null
  hireDate: Date | null
  companyId: IntegerIdVO | null
  departmentId: IntegerIdVO | null
  positionId: IntegerIdVO | null
  departmentSyncId: string
  positionSyncId: string
  photo: string | null
  workSchedule: string | null
  personId: IntegerIdVO | null
  businessUnitId: IntegerIdVO | null
  payrollBusinessUnitId: IntegerIdVO | null
  assistDiscriminator: number
  lastSynchronizationAt: Date | null
  typeOfContract: string | null
  terminatedDate: Date | null
  typeId: IntegerIdVO | null
  businessEmail: EmailVO | null
  ignoreConsecutiveAbsences: number
  createdAt: Date | null
  updatedAt: Date | null
  deletedAt: Date | null
  userResponsibleEmployeeChecked?: boolean
  userResponsibleEmployeeReadonly?: boolean
  userResponsibleEmployeeDirectBoss: boolean
}
