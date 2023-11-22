<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <div class="font-roboto flex h-screen flex-col bg-gray-200">
    <AppHeader />

    <main class="flex flex-1 overflow-hidden">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
