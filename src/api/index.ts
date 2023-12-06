import axios from 'axios'
import type { IAuthResponse } from '@/types'
import { API_BASE_URL, REFRESH_ENDPOINT } from '@/constants/apiConstants'

const refreshApi = `${API_BASE_URL}${REFRESH_ENDPOINT}`

const $api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
})

$api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

$api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    if (
      error.config &&
      error.response &&
      error.response.status === 401 &&
      !error.config.__isRetry
    ) {
      error.config.__isRetry = true

      try {
        const { data } = await axios.get<IAuthResponse>(refreshApi, {
          withCredentials: true
        })
        if (!data?.token) {
          localStorage.removeItem('token')
        } else {
          localStorage.setItem('token', data.token)
        }
        return $api.request(originalRequest)
      } catch (e) {
        console.log('NOT AUTHORISED')
        return Promise.reject('Unauthorized')
      }
    }
    throw error
  }
)

export default $api
