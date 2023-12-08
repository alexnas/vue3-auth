<script setup lang="ts">
import { computed, ref } from 'vue'
import AuthViewContainer from '@/auth/views/AuthViewContainer.vue'
import AuthFormContainer from '@/auth/views/AuthFormContainer.vue'
import LoginForm from '@/auth/components/LoginForm.vue'
import RegisterForm from '@/auth/components/RegisterForm.vue'
import { useAuthStore } from '@/auth/stores/auth'

const authStore = useAuthStore()

const pageTitle = 'Authentication'
const isLoginForm = ref(true)

const formTitle = computed(() => {
  return isLoginForm.value ? 'Login' : 'Sign up'
})

const toggleAuth = () => {
  authStore.cleanError()
  return (isLoginForm.value = !isLoginForm.value)
}
</script>

<template>
  <auth-view-container :pageTitle="pageTitle">
    <auth-form-container :formTitle="formTitle">
      <div v-if="isLoginForm">
        <login-form @toggleAuth="toggleAuth" />
      </div>
      <div v-else>
        <register-form @toggleAuth="toggleAuth" />
      </div>
    </auth-form-container>
  </auth-view-container>
</template>
