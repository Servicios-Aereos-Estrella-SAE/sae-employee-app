import { InvalidFieldFormatException } from '../exceptions/invalid-field-format.exception'

/**
 * Value Object para representar un correo electrónico.
 */
export class EmailVO {
  /**
   * Constructor del Value Object.
   * @param {string} email - El correo electrónico.
   * @throws {InvalidFieldFormatException} - Error de formato para el campo email.
   * - Valida que el correo electrónico sea válido.
   */
  constructor(private readonly email: string) {
    if (!this.isValidEmail(email)) {
      throw new InvalidFieldFormatException('email')
    }
  }

  /**
   * Valida si el correo electrónico es válido.
   * @param {string} email - El correo electrónico a validar.
   * @returns {boolean} - true si el correo electrónico es válido, false en caso contrario.
   */
  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  /**
   * Obtiene el valor del correo electrónico.
   * @returns {string} - El correo electrónico del objeto.
   */
  value(): string {
    return this.email
  }
}
