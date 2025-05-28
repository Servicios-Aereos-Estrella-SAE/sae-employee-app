import { IEmployee } from '../types/employee.interface'

/**
 * Entidad para representar un empleado.
 */
export class EmployeeEntity {
  /**
   * Constructor de la entidad.
   * @param {IEmployee} properties - Propiedades del empleado.
   */
  constructor(private readonly properties: IEmployee) {}

  /**
   * Propiedades del empleado.
   * @returns {IEmployee} - Propiedades del empleado.
   */
  get props(): IEmployee {
    return this.properties
  }
}
