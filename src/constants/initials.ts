import type { IUser } from '@/types'

const initUser: IUser = {
  id: -1,
  name: '',
  email: '',
  password: '',
  roleId: -1,
  isActive: true,
  createdAt: '',
  updatedAt: ''
}

const sampleUser: IUser = {
  id: 234234234234234,
  name: 'SAMPLE',
  email: 'sample@gmail.com',
  password: '',
  roleId: -1,
  isActive: true,
  createdAt: '',
  updatedAt: ''
}

export { initUser, sampleUser }
