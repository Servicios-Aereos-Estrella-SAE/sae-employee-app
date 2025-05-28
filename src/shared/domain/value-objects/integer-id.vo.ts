import { InvalidFieldFormatException } from '../exceptions/invalid-field-format.exception'

/**
 * Value Object para representar un ID entero.
 */
export class IntegerIdVO {
  /**
   * Constructor del Value Object.
   * @param {number} value - El ID entero.
   * @throws {InvalidFieldFormatException} - Error de formato para el campo id.
   * - Valida que sea un número entero.
   * - Valida que sea mayor a 0.
   */
  constructor(readonly value: number) {
    if (value <= 0 || !Number.isInteger(value)) {
      throw new InvalidFieldFormatException('id')
    }
  }
}
