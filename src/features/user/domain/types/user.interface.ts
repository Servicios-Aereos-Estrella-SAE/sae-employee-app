export interface IUser {
  id: number | null
  email: string
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
