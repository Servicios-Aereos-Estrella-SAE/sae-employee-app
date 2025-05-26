import { InvalidFieldFormatException } from '../exceptions/invalid-field-format.exception'

/**
 * Value Object para representar un ID entero.
 */
export class IntegerIdVO {
  /**
   * Constructor del Value Object.
   * @param {number} id - El ID entero.
   * @throws {InvalidFieldFormatException} - Error de formato para el campo id.
   * - Valida que sea un número entero.
   * - Valida que sea mayor a 0.
   */
  constructor(private readonly id: number) {
    if (id <= 0 || !Number.isInteger(id)) {
      throw new InvalidFieldFormatException('id')
    }
  }

  /**
   * Obtiene el valor del ID.
   * @returns {number} - El ID del objeto.
   */
  value(): number {
    return this.id
  }
}
