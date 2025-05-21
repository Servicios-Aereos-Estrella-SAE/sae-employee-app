import i18n from 'i18next'
/**
 * Excepción para indicar que todos los campos son requeridos.
 */
export class RequiredAllFieldsException extends Error {
  /**
   * Constructor de la excepción de campos requeridos.
   */
  constructor() {
    super(i18n.t('errors.requiredAllFieldsException'))
    this.name = 'RequiredAllFieldsException'
    Object.setPrototypeOf(this, RequiredAllFieldsException.prototype)
  }
}
