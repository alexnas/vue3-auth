<script setup lang="ts">
defineProps({
  formTitle: {
    type: String,
    default: 'Sign in'
  }
})
</script>

<template>
  <div class="relative py-3 sm:mx-auto sm:max-w-xl">
    <div
      class="absolute inset-0 -skew-y-6 transform rounded-md bg-gradient-to-r from-gray-300 to-gray-600 shadow-lg sm:-rotate-6 sm:skew-y-0 sm:rounded-3xl"
    ></div>
    <div class="relative bg-white px-4 py-12 shadow-lg sm:rounded-3xl sm:px-6">
      <div class="mx-auto max-w-md">
        <div>
          <h1 class="text-center text-2xl font-semibold text-gray-600">{{ formTitle }}</h1>
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>
