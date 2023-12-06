interface IUser {
  id: number
  name: string
  email: string
  password: string
  roleId: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface IAuthResponse {
  token: string
  user: IUser
}

export type { IUser, IAuthResponse }
