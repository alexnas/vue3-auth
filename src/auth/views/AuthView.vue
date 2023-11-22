<script setup lang="ts">
import AuthViewContainer from '@/auth/views/AuthViewContainer.vue'
const pageTitle = 'Authentication'
</script>

<style scoped></style>

<template>
  <auth-view-container :pageTitle="pageTitle">
    <div>Auth Form</div>
  </auth-view-container>
</template>
