import { EHttpStatusCode } from '../types/http-status-code.enum'
import { IHttpStatus } from '../types/http-status.interface'

export const HTTP_STATUS: Record<EHttpStatusCode, IHttpStatus> = {
  /**
   * ====================================================================================================================================
   * 2xx Success
   * ====================================================================================================================================
   */
  [EHttpStatusCode.OK]: {
    code: EHttpStatusCode.OK,
    name: 'OK',
    description: 'The request has succeeded'
  },
  [EHttpStatusCode.CREATED]: {
    code: EHttpStatusCode.CREATED,
    name: 'Created',
    description:
      'The request has been fulfilled and resulted in a new resource being created'
  },
  [EHttpStatusCode.ACCEPTED]: {
    code: EHttpStatusCode.ACCEPTED,
    name: 'Accepted',
    description:
      'The request has been accepted for processing, but the processing has not been completed'
  },
  [EHttpStatusCode.NO_CONTENT]: {
    code: EHttpStatusCode.NO_CONTENT,
    name: 'No Content',
    description:
      'The server has fulfilled the request but there is no additional content to send'
  },

  /**
   * ====================================================================================================================================
   * 4xx Client Error
   * ====================================================================================================================================
   */
  [EHttpStatusCode.BAD_REQUEST]: {
    code: EHttpStatusCode.BAD_REQUEST,
    name: 'Bad Request',
    description:
      'The server cannot or will not process the request due to something that is perceived to be a client error'
  },
  [EHttpStatusCode.UNAUTHORIZED]: {
    code: EHttpStatusCode.UNAUTHORIZED,
    name: 'Unauthorized',
    description: 'The request requires user authentication'
  },
  [EHttpStatusCode.FORBIDDEN]: {
    code: EHttpStatusCode.FORBIDDEN,
    name: 'Forbidden',
    description: 'The server understood the request but refuses to authorize it'
  },
  [EHttpStatusCode.NOT_FOUND]: {
    code: EHttpStatusCode.NOT_FOUND,
    name: 'Not Found',
    description: 'The server cannot find the requested resource'
  },
  [EHttpStatusCode.METHOD_NOT_ALLOWED]: {
    code: EHttpStatusCode.METHOD_NOT_ALLOWED,
    name: 'Method Not Allowed',
    description:
      'The method specified in the request is not allowed for the resource identified by the request URI'
  },
  [EHttpStatusCode.CONFLICT]: {
    code: EHttpStatusCode.CONFLICT,
    name: 'Conflict',
    description:
      'The request could not be completed due to a conflict with the current state of the resource'
  },
  [EHttpStatusCode.UNPROCESSABLE_ENTITY]: {
    code: EHttpStatusCode.UNPROCESSABLE_ENTITY,
    name: 'Unprocessable Entity',
    description:
      'The server understands the content type of the request entity, but was unable to process the contained instructions'
  },

  /**
   * ====================================================================================================================================
   * 5xx Server Error
   * ====================================================================================================================================
   */
  [EHttpStatusCode.INTERNAL_SERVER_ERROR]: {
    code: EHttpStatusCode.INTERNAL_SERVER_ERROR,
    name: 'Internal Server Error',
    description:
      'The server encountered an unexpected condition that prevented it from fulfilling the request'
  },
  [EHttpStatusCode.NOT_IMPLEMENTED]: {
    code: EHttpStatusCode.NOT_IMPLEMENTED,
    name: 'Not Implemented',
    description:
      'The server does not support the functionality required to fulfill the request'
  },
  [EHttpStatusCode.BAD_GATEWAY]: {
    code: EHttpStatusCode.BAD_GATEWAY,
    name: 'Bad Gateway',
    description:
      'The server, while acting as a gateway or proxy, received an invalid response from the upstream server'
  },
  [EHttpStatusCode.SERVICE_UNAVAILABLE]: {
    code: EHttpStatusCode.SERVICE_UNAVAILABLE,
    name: 'Service Unavailable',
    description:
      'The server is currently unable to handle the request due to a temporary overload or scheduled maintenance'
  },
  [EHttpStatusCode.GATEWAY_TIMEOUT]: {
    code: EHttpStatusCode.GATEWAY_TIMEOUT,
    name: 'Gateway Timeout',
    description:
      'The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server'
  }
}
