import { IErrorResponse } from '../types/error-response.interface'
import { EHttpStatusCode } from '../types/http-status-code.enum'
import { ISuccessResponse } from '../types/success-response.interface'
import { HTTP_STATUS } from './http-status.list'

/**
 * Clase que proporciona métodos para crear respuestas HTTP exitosas y de error.
 * @class HttpResponse
 */
export class HttpResponse {
  /**
   * Crea una respuesta HTTP exitosa.
   * @param {T} data - Los datos a incluir en la respuesta.
   * @param {number} code - El código de estado HTTP.
   * @param {string} message - El mensaje opcional a incluir en la respuesta.
   * @returns {ISuccessResponse<T>} La respuesta HTTP exitosa.
   */
  static success<T>(
    data: T,
    code: number,
    message?: string
  ): ISuccessResponse<T> {
    return {
      status: 'success',
      code,
      httpCodeInfo: HTTP_STATUS[code as EHttpStatusCode],
      data,
      ...(message && { message })
    }
  }

  /**
   * Crea una respuesta HTTP de error.
   * @param {string} message - El mensaje de error.
   * @param {string} type - El tipo de error.
   * @param {number} code - El código de estado HTTP.
   * @param {unknown} details - Los detalles opcionales del error.
   * @returns {IErrorResponse} La respuesta HTTP de error.
   */
  static error(
    message: string,
    type: string,
    code: number,
    details?: unknown
  ): IErrorResponse {
    return {
      status: 'error',
      code,
      httpCodeInfo: HTTP_STATUS[code as EHttpStatusCode],
      type,
      message,
      details
    }
  }

  /**
   * Crea una respuesta HTTP de error 400.
   * @param {string} message - El mensaje de error.
   * @param {string} type - El tipo de error.
   * @param {unknown} details - Los detalles opcionales del error.
   * @returns {IErrorResponse} La respuesta HTTP de error 400.
   */
  static badRequest(
    message: string,
    type: string,
    details?: unknown
  ): IErrorResponse {
    return this.error(message, type, EHttpStatusCode.BAD_REQUEST, details)
  }

  /**
   * Crea una respuesta HTTP de error 404.
   * @param {string} message - El mensaje de error.
   * @param {string} type - El tipo de error.
   * @param {unknown} details - Los detalles opcionales del error.
   * @returns {IErrorResponse} La respuesta HTTP de error 404.
   */
  static notFound(
    message: string,
    type: string,
    details?: unknown
  ): IErrorResponse {
    return this.error(message, type, EHttpStatusCode.NOT_FOUND, details)
  }

  /**
   * Crea una respuesta HTTP de error 500.
   * @param {string} message - El mensaje de error.
   * @param {string} type - El tipo de error.
   * @param {unknown} details - Los detalles opcionales del error.
   * @returns {IErrorResponse} La respuesta HTTP de error 500.
   */
  static internalServerError(
    message: string,
    type: string,
    details?: unknown
  ): IErrorResponse {
    return this.error(
      message,
      type,
      EHttpStatusCode.INTERNAL_SERVER_ERROR,
      details
    )
  }

  /**
   * Crea una respuesta HTTP de error 401.
   * @param {string} message - El mensaje de error.
   * @param {string} type - El tipo de error.
   * @param {unknown} details - Los detalles opcionales del error.
   * @returns {IErrorResponse} La respuesta HTTP de error 401.
   */
  static unauthorized(
    message: string,
    type: string,
    details?: unknown
  ): IErrorResponse {
    return this.error(message, type, EHttpStatusCode.UNAUTHORIZED, details)
  }

  /**
   * Crea una respuesta HTTP de error 403.
   * @param {string} message - El mensaje de error.
   * @param {string} type - El tipo de error.
   * @param {unknown} details - Los detalles opcionales del error.
   * @returns {IErrorResponse} La respuesta HTTP de error 403.
   */
  static forbidden(
    message: string,
    type: string,
    details?: unknown
  ): IErrorResponse {
    return this.error(message, type, EHttpStatusCode.FORBIDDEN, details)
  }

  /**
   * Crea una respuesta HTTP de error 409.
   * @param {string} message - El mensaje de error.
   * @param {string} type - El tipo de error.
   * @param {unknown} details - Los detalles opcionales del error.
   * @returns {IErrorResponse} La respuesta HTTP de error 409.
   */
  static conflict(
    message: string,
    type: string,
    details?: unknown
  ): IErrorResponse {
    return this.error(message, type, EHttpStatusCode.CONFLICT, details)
  }

  /**
   * Crea una respuesta HTTP de error 422.
   * @param {string} message - El mensaje de error.
   * @param {string} type - El tipo de error.
   * @param {unknown} details - Los detalles opcionales del error.
   * @returns {IErrorResponse} La respuesta HTTP de error 422.
   */
  static unprocessableEntity(
    message: string,
    type: string,
    details?: unknown
  ): IErrorResponse {
    return this.error(
      message,
      type,
      EHttpStatusCode.UNPROCESSABLE_ENTITY,
      details
    )
  }

  /**
   * Crea una respuesta HTTP exitosa 201.
   * @param {T} data - Los datos a incluir en la respuesta.
   * @returns {ISuccessResponse<T>} La respuesta HTTP exitosa 201.
   */
  static created<T>(data: T): ISuccessResponse<T> {
    return this.success(
      data,
      EHttpStatusCode.CREATED,
      HTTP_STATUS[EHttpStatusCode.CREATED].description
    )
  }

  /**
   * Crea una respuesta HTTP exitosa 200.
   * @param {T} data - Los datos a incluir en la respuesta.
   * @returns {ISuccessResponse<T>} La respuesta HTTP exitosa 200.
   */
  static ok<T>(data: T): ISuccessResponse<T> {
    return this.success(
      data,
      EHttpStatusCode.OK,
      HTTP_STATUS[EHttpStatusCode.OK].description
    )
  }
}
