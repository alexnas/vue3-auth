<script setup lang="ts">
import { computed, ref } from 'vue'
import AuthViewContainer from '@/auth/views/AuthViewContainer.vue'
import AuthFormContainer from '@/auth/views/AuthFormContainer.vue'
import LoginForm from '@/auth/components/LoginForm.vue'

const pageTitle = 'Authentication'
const isLoginForm = ref(true)

const formTitle = computed(() => {
  return isLoginForm.value ? 'Login' : 'Sign up'
})
</script>

<template>
  <auth-view-container :pageTitle="pageTitle">
    <auth-form-container :formTitle="formTitle">
      <div v-if="isLoginForm">
        <login-form />
      </div>
      <div v-else>Register Form</div>
    </auth-form-container>
  </auth-view-container>
</template>
