import { IHttpStatus } from './http-status.interface'

export interface ISuccessResponse<T> {
  status: 'success'
  code: number
  httpCodeInfo: IHttpStatus
  data: T
  message?: string
}
