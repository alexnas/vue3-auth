<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

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

function onSubmit(values: any) {
  alert(JSON.stringify(values, null, 2))
}
</script>

<template>
  <Form @submit="onSubmit" :validation-schema="registerSchema" v-slot="{ meta }">
    <div class="space-y-4 px-4 py-8 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
      <div class="relative">
        <Field
          autocomplete="off"
          id="name"
          name="name"
          type="text"
          class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-teal-600 focus:outline-none"
          placeholder="Username"
        />
        <label
          for="name"
          class="peer-placeholder-shown:text-gray-440 absolute -top-3.5 left-0 pl-2 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
          >Username</label
        >
        <ErrorMessage class="flex justify-end text-sm text-orange-400" name="name" />
      </div>

      <div class="relative">
        <Field
          autocomplete="off"
          id="email"
          name="email"
          type="email"
          class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-teal-600 focus:outline-none"
          placeholder="Email address"
        />
        <label
          for="email"
          class="peer-placeholder-shown:text-gray-440 absolute -top-3.5 left-0 pl-2 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
          >Email Address</label
        >
        <ErrorMessage class="flex justify-end text-sm text-orange-400" name="email" />
      </div>

      <div>
        <div class="relative flex">
          <Field
            autocomplete="off"
            id="password"
            name="password"
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
        <ErrorMessage class="flex justify-end text-sm text-orange-400" name="password" />
      </div>

      <div>
        <div class="relative flex">
          <Field
            autocomplete="off"
            id="confirm_password"
            name="confirm_password"
            :type="passwordShow ? 'text' : 'password'"
            class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-teal-600 focus:outline-none"
            placeholder="Confirm Password"
          />
          <label
            for="confirm_password"
            class="peer-placeholder-shown:text-gray-440 absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
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
        <ErrorMessage class="flex justify-end text-sm text-orange-400" name="confirm_password" />
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
            @click="$emit('toggle-auth')"
            class="ml-2 p-2 font-medium text-teal-600 hover:bg-gray-100 hover:text-orange-600"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  </Form>
</template>
