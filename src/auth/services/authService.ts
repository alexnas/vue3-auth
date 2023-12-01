import $api from '@/api'
import type { AxiosResponse } from 'axios'
import type { IAuthResponse } from '@/types'

import { LOGIN_ENDPOINT, LOGOUT_ENDPOINT } from '@/constants/apiConstants'

export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>(LOGIN_ENDPOINT, { email, password })
  }

  static async logout(): Promise<void> {
    return $api.post(LOGOUT_ENDPOINT)
  }
}
