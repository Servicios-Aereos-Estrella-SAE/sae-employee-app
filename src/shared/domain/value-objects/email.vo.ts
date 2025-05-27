/* eslint-disable no-useless-escape */
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
    this.isValidEmail(email)
    this.ensureNoSqlInjection(email)
  }

  /**
   * Valida si el correo electrónico es válido.
   * @param {string} email - El correo electrónico a validar.
   * @returns {void}
   */
  private isValidEmail(email: string): void {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!regex.test(email)) {
      throw new InvalidFieldFormatException('email')
    }
  }

  /**
   * Valida que el correo electrónico no contenga patrones de inyección SQL
   * @param value - El correo electrónico a validar
   * @throws {InvalidFieldFormatException} Si se detectan patrones de inyección SQL
   * @return {void}
   */
  private ensureNoSqlInjection(email: string): void {
    const sqlInjectionPatterns = [
      /(\%27)|(\')|(\-\-)|(\%23)|(#)/i,
      /((\%3D)|(=))[^\n]*((\%27)|(\')|(\-\-)|(\%3B)|(;))/i,
      /\w*((\%27)|(\'))((\%6F)|o|(\%4F))((\%72)|r|(\%52))/i,
      /((\%27)|(\'))union/i,
      /exec(\s|\+)+(s|x)p\w+/i,
      /insert|update|delete|drop|truncate|alter/i
    ]

    for (const pattern of sqlInjectionPatterns) {
      if (pattern.test(email)) {
        throw new InvalidFieldFormatException('email')
      }
    }
  }

  /**
   * Obtiene el valor del correo electrónico.
   * @returns {string} - El correo electrónico del objeto.
   */
  value(): string {
    return this.email
  }
}
