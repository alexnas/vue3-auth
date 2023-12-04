import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { IUser } from '@/types'
import { initUser } from '@/constants/initials'
import AuthService from '@/auth/services/authService'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const isAuth = ref<Boolean>(!!localStorage.getItem('token'))
  const loggedUser = ref<IUser>(
    String(localStorage.getItem('user'))
      ? { ...JSON.parse(String(localStorage.getItem('user'))) }
      : { ...initUser }
  )
  const isDbConnected = ref(true)
  const dbConnectionMsg = ref('Something test for connection')
  const loading = ref(false)
  const error = ref<string | null>(null)

  const checkDbConnection = async () => {
    loading.value = true
    error.value = null

    try {
      const { data } = await AuthService.checkIfDbConnected()
      isDbConnected.value = data.isDbConnected
      dbConnectionMsg.value = data.dbConnectionMsg
      loading.value = false
    } catch (err: any) {
      loading.value = false

      if (axios.isAxiosError(err)) {
        isDbConnected.value = false
        dbConnectionMsg.value = 'Server connection was lost'
        error.value = err.message
        console.log('Axios Error', err.message)
      } else {
        error.value = 'Unexpected error encountered'
        console.log('Error', err)
      }
    }
  }

  const login = async (email: string, password: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await AuthService.login(email, password)
      setupToken(response.data)

      router.replace({ name: 'home' })
      loading.value = false
    } catch (err: any) {
      loading.value = false
      if (+err?.response.status === 403) {
        error.value = '403 Forbidden Error. Check your login and password.'
        console.log('Error 403. Check your login and password.', err)
      } else {
        error.value = 'Something went wrong...'
        console.log('Unexpected error', err)
      }
    }
  }

  const register = async (email: string, name: string, password: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await AuthService.register(email, name, password)
      setupToken(response.data)

      router.replace({ name: 'home' })
      loading.value = false
    } catch (err: any) {
      loading.value = false
      if (+err?.response.status === 409) {
        error.value = 'Change your email. Chosen email is busy.'
        console.log('Signup Error 409. Change your email.', err)
      } else {
        error.value = 'Something went wrong...'
        console.log('Unexpected error', err)
      }
    }
  }

  const logout = async () => {
    loading.value = true
    error.value = null
    try {
      removeToken()
      await AuthService.logout()
      loading.value = false
    } catch (err: any) {
      loading.value = false
      error.value = 'Unexpected error encountered'
      console.log('Error', err)
    }
  }

  const setupToken = (data: { user: IUser; token: string }) => {
    const userData = { ...data.user, password: '' }
    loggedUser.value = { ...userData } as IUser
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', data.token)
    isAuth.value = true
    return
  }

  const removeToken = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    loggedUser.value = { ...initUser } as IUser
    isAuth.value = false
    return
  }

  return {
    isAuth,
    loggedUser,
    isDbConnected,
    dbConnectionMsg,
    loading,
    error,
    checkDbConnection,
    login,
    register,
    logout,
    setupToken,
    removeToken
  }
})
