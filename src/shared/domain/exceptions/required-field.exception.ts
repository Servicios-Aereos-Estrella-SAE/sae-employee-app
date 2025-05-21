import i18n from 'i18next'
/**
 * Excepción para indicar que un campo es requerido.
 */
export class RequiredFieldException extends Error {
  /**
   * Constructor de la excepción de campo requerido.
   * @param {string} fieldName - Nombre del campo que es requerido.
   */
  constructor(fieldName: string) {
    super(i18n.t('errors.requiredFieldException', { fieldName }))
    this.name = 'RequiredFieldException'
    Object.setPrototypeOf(this, RequiredFieldException.prototype)
  }
}
