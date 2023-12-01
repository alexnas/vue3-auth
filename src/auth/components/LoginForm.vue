<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useAuthStore } from '@/auth/stores/auth'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { error } = storeToRefs(authStore)

defineEmits(['toggle-auth'])
const passwordShow = ref(false)

const loginSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(5).max(10)
})

const toggleShowPassword = () => {
  passwordShow.value = !passwordShow.value
}

const initialLoginData = {
  email: 'www1@aaa.aaa',
  password: '123123123'
}

const resetLoginData = {
  email: 'reset@email.com',
  password: ''
}

const { handleSubmit, defineField, resetForm, meta, errors } = useForm({
  validationSchema: loginSchema,
  initialValues: initialLoginData
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit.withControlled(async (values) => {
  await authStore.login(values.email, values.password)

  resetForm({ values: resetLoginData })
})
</script>

<template>
  <form @submit="onSubmit">
    <div class="mt-2 space-y-8 px-4 pt-8 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
      <div
        v-if="error && error.length > 0"
        class="mb-6 flex gap-3 rounded-md border border-red-500 bg-red-50 p-4"
      >
        <svg
          class="h-5 w-5 text-red-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
            clip-rule="evenodd"
          />
        </svg>
        <h3 class="text-sm font-medium text-red-800">{{ error }}</h3>
      </div>
      <div class="relative">
        <input
          autocomplete="off"
          id="email"
          name="email"
          type="text"
          v-model="email"
          v-bind="emailAttrs"
          class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-teal-600 focus:outline-none"
          placeholder="Email address"
        />
        <label
          for="email"
          class="peer-placeholder-shown:text-gray-440 absolute -top-3.5 left-0 pl-2 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
          >Email Address</label
        >
        <div class="flex justify-end text-sm text-orange-400">{{ errors.email }}</div>
      </div>

      <div>
        <div class="relative flex">
          <input
            autocomplete="off"
            id="password"
            name="password"
            v-model="password"
            v-bind="passwordAttrs"
            :type="passwordShow ? 'text' : 'password'"
            class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-teal-600 focus:outline-none"
            placeholder="Password"
          />
          <label
            for="password"
            class="peer-placeholder-shown:text-gray-440 absolute -top-3.5 left-0 pl-2 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
            >Password</label
          >
          <button
            class="absolute right-0 top-0 inline-flex h-full w-10 items-center justify-center text-gray-400"
            @click.prevent="toggleShowPassword"
          >
            <Icon
              class="w-6 min-w-[theme('spacing[5]')] text-3xl text-gray-400 hover:text-teal-600"
              :icon="passwordShow ? 'mdi:eye-outline' : 'mdi:eye-off-outline'"
              :inline="true"
            />
          </button>
        </div>
        <div class="flex justify-end text-sm text-orange-400">{{ errors.password }}</div>
      </div>

      <div class="relative">
        <button
          type="submit"
          :disabled="!meta.valid"
          class="mt-3 w-full items-center justify-center rounded-md px-8 py-2 text-base text-white transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2 enabled:bg-teal-700 enabled:hover:bg-teal-600 disabled:bg-gray-400 sm:rounded-lg"
        >
          Submit
        </button>

        <p class="ml-3 mt-2 text-sm font-light text-gray-500">
          <span>Don't have an account yet? </span>
          <button
            @click="$emit('toggle-auth')"
            class="ml-2 p-2 font-medium text-teal-600 hover:bg-gray-100 hover:text-orange-600"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  </form>
</template>
