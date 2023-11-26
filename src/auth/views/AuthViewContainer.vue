<script setup lang="ts">
defineProps({
  pageTitle: {
    type: String,
    default: 'Auth View'
  }
})
</script>

<template>
  <div class="container relative mx-auto my-6 flex flex-col overflow-y-auto sm:px-6 lg:px-8">
    <div class="flex items-center justify-center">
      <div>
        <h1 class="mb-12 mt-6 text-3xl font-semibold text-teal-600">{{ pageTitle }}</h1>
      </div>
    </div>

    <slot />
  </div>
</template>
