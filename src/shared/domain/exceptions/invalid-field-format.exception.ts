import i18n from 'i18next'
/**
 * Excepción para indicar que un campo tiene un formato inválido.
 */
export class InvalidFieldFormatException extends Error {
  /**
   * Constructor de la excepción de formato de campo inválido.
   * @param {string} fieldName - Nombre del campo que tiene un formato inválido.
   */
  constructor(fieldName: string) {
    super(i18n.t('errors.invalidFieldFormatException', { fieldName }))
    this.name = 'InvalidFieldFormatException'
    Object.setPrototypeOf(this, InvalidFieldFormatException.prototype)
  }
}
