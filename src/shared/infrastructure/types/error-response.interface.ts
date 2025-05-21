import { IHttpStatus } from './http-status.interface'

export interface IErrorResponse {
  status: 'error'
  message: string
  type: string
  code: number
  details?: unknown
  httpCodeInfo: IHttpStatus
}
