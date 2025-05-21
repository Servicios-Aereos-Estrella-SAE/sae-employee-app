import { EHttpStatusCode } from './http-status-code.enum'

export interface IHttpStatus {
  code: EHttpStatusCode
  name: string
  description: string
}
