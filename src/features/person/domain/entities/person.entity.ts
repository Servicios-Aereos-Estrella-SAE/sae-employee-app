import { IPerson } from '../types/person.interface'

/**
 * Entidad para representar una persona.
 */
export class PersonEntity {
  /**
   * Constructor de la entidad.
   * @param {IPerson} properties - Propiedades de la persona.
   */
  constructor(private readonly properties: IPerson) {}

  /**
   * Propiedades de la persona.
   * @returns {IPerson} - Propiedades de la persona.
   */
  get props(): IPerson {
    return this.properties
  }
}
