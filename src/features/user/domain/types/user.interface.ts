import { EmailVO } from '../../../../shared/domain/value-objects/email.vo'
import { IntegerIdVO } from '../../../../shared/domain/value-objects/integer-id.vo'

export interface IUser {
  id: IntegerIdVO | null
  email: EmailVO
  password: string
  token: string | null
  pinCode: string | null
  active: boolean
  personId: number
  roleId: number
  pinCodeExpiresAt: Date | null
  businessAccess: string | null
  createdAt: Date | null
  updatedAt: Date | null
  deletedAt: Date | null
}
