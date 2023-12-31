<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { Icon } from '@iconify/vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useAuthStore } from '@/auth/stores/auth'

const authStore = useAuthStore()
const { error } = storeToRefs(authStore)

defineEmits(['toggle-auth'])
const passwordShow = ref(false)

const registerSchema = yup.object({
  name: yup.string().required().min(5).max(30),
  email: yup.string().required().email(),
  password: yup.string().required().min(5).max(10),
  confirm_password: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Passwords do not match')
})

const toggleShowPassword = () => {
  passwordShow.value = !passwordShow.value
}

const initialRegisterData = {
  name: '',
  email: '',
  password: '',
  confirm_password: ''
}

const { handleSubmit, defineField, resetForm, meta, errors } = useForm({
  validationSchema: registerSchema,
  initialValues: initialRegisterData
})

const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const [confirmPassword, confirmPasswordAttrs] = defineField('confirm_password')

const onSubmit = handleSubmit.withControlled(async (values) => {
  await authStore.checkDbConnection()
  if (error.value) return
  await authStore.register(values.email, values.name, values.password)
  if (error.value) return
  resetForm({ values: initialRegisterData })
})
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div
      class="mt-2 space-y-8 px-4 pt-8 text-base leading-6 text-orange-500 sm:text-lg sm:leading-7"
    >
      <div
        v-if="error"
        class="mb-6 flex items-center justify-between gap-1 rounded-md border border-orange-500 bg-orange-50 p-4"
      >
        <div>{{ error }}</div>
        <Icon class="w-8 text-2xl" :icon="'icon-park-solid:attention'" :inline="true" />
      </div>

      <div class="relative">
        <input
          autocomplete="off"
          id="name"
          name="name"
          type="text"
          v-model="name"
          v-bind="nameAttrs"
          v-on:blur="authStore.checkDbConnection()"
          class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-teal-600 focus:outline-none"
          placeholder="Username"
        />
        <label
          for="name"
          class="peer-placeholder-shown:text-gray-440 absolute -top-3.5 left-0 pl-2 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
          >Username</label
        >
        <div class="flex justify-end text-sm text-orange-400">{{ errors.name }}</div>
      </div>

      <div class="relative">
        <input
          autocomplete="off"
          id="email"
          name="email"
          type="text"
          v-model="email"
          v-bind="emailAttrs"
          v-on:blur="authStore.checkDbConnection()"
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

      <div>
        <div class="relative flex">
          <input
            autocomplete="off"
            id="confirm_password"
            name="confirm_password"
            v-model="confirmPassword"
            v-bind="confirmPasswordAttrs"
            :type="passwordShow ? 'text' : 'password'"
            class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-teal-600 focus:outline-none"
            placeholder="Confirm Password"
          />
          <label
            for="confirm_password"
            class="peer-placeholder-shown:text-gray-440 absolute -top-3.5 left-0 pl-2 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
            >Confirm Password</label
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
        <div class="flex justify-end text-sm text-orange-400">{{ errors.confirm_password }}</div>
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
          <span>Have an account already? </span>
          <button
            type="button"
            @click="$emit('toggle-auth')"
            class="ml-2 p-2 font-medium text-teal-600 hover:bg-gray-100 hover:text-orange-600"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  </form>
</template>
