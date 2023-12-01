<script setup lang="ts">
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { Icon } from '@iconify/vue'
import { useAuthStore } from '@/auth/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const { isAuth, loggedUser } = storeToRefs(authStore)

const handleAuthUser = () => {
  if (!isAuth.value) {
    router.replace({ name: 'auth' })
  }
  if (isAuth.value) {
    if (confirm('Do you really want logout?')) {
      authStore.logout()
      isAuth.value = false
      router.replace({ name: 'home' })
    }
  }
}
</script>

<template>
  <nav class="bg-gray-800">
    <div class="mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="flex items-center">
          <router-link to="/" class="flex items-end">
            <div class="flex items-end text-orange-400 hover:text-teal-600">
              <Icon class="text-3xl" icon="iconoir:vue-js" :inline="true" />
              <Icon class="-mb-1 -ml-3 text-2xl text-gray-200" icon="fa6-solid:a" :inline="true" />
            </div>
          </router-link>

          <router-link
            to="/"
            class="rounded-md px-3 py-2 text-lg font-medium text-gray-300 hover:text-orange-400"
            aria-current="page"
            >Vue3-Auth</router-link
          >
        </div>
        <div class="flex justify-end sm:items-stretch sm:justify-start">
          <div class="flex items-center">
            <router-link
              to="/"
              class="rounded-md px-3 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white"
              aria-current="page"
              >Home</router-link
            >
            <router-link
              to="/about"
              class="rounded-md px-3 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white"
              >About</router-link
            >
          </div>
          <div class="ml-6 sm:ml-16">
            <!-- User on/off -->
            <div class="flex justify-center text-base text-teal-400">
              {{ isAuth ? loggedUser.name : 'Guest' }}
            </div>

            <div class="flex justify-end space-x-4">
              <button
                @click.prevent="handleAuthUser"
                class="uppercase text-gray-400 hover:text-gray-100"
              >
                {{ isAuth ? 'Logout' : 'Login' }}
              </button>

              <div class="relative ml-3 mr-2 text-gray-400">
                <button
                  type="button"
                  class="rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <Icon
                    v-if="isAuth"
                    icon="bi:person-circle"
                    :inline="true"
                    class="h-6 w-6 min-w-[theme('spacing[5]')] cursor-text text-3xl text-gray-400"
                  />
                  <Icon
                    v-else
                    icon="ant-design:login-outlined"
                    :inline="true"
                    class="h-6 w-6 min-w-[theme('spacing[5]')] cursor-text text-3xl text-teal-400"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
