import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import type { IUser } from '@/types'
import { initUser, sampleUser } from '@/constants/initials'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const isAuth = ref<Boolean>(!!localStorage.getItem('token'))
  const loggedUser = ref<IUser>({ ...initUser })

  const login = (email: string, password: string) => {
    console.log('inside login', email, password)
    const data = { user: sampleUser, token: 'SampleToken' } // fake data right now
    setupToken(data)
    router.replace({ name: 'home' })
  }

  const setupToken = (data: { user: IUser; token: string }) => {
    localStorage.setItem('token', data.token)
    loggedUser.value = { ...data.user, password: '' }
    isAuth.value = true
    return
  }

  const removeToken = () => {
    localStorage.removeItem('token')
    loggedUser.value = { ...initUser } as IUser
    isAuth.value = false
    return
  }

  const logout = () => {
    removeToken()
  }
  return { isAuth, loggedUser, login, logout, setupToken, removeToken }
})
