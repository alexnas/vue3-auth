import $api from '@/api'
import type { AxiosResponse } from 'axios'
import type { IAuthResponse } from '@/types'

import { IS_CONNECTED_ENDPOINT, LOGIN_ENDPOINT, LOGOUT_ENDPOINT } from '@/constants/apiConstants'

interface IConnected {
  isDbConnected: boolean
  dbConnectionMsg: string
}

export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
    return await $api.post<IAuthResponse>(LOGIN_ENDPOINT, { email, password })
  }

  static async logout(): Promise<void> {
    return await $api.post(LOGOUT_ENDPOINT)
  }

  static async checkIfDbConnected(): Promise<AxiosResponse<IConnected>> {
    return await $api.get<IConnected>(`${IS_CONNECTED_ENDPOINT}`)
  }
}
