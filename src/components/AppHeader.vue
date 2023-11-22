<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <nav class="bg-gray-800">
    <div class="mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="flex">
          <router-link to="/">
            <Icon
              class="text-3xl text-orange-600 hover:text-teal-600"
              icon="iconoir:vue-js"
              :inline="true"
            />
          </router-link>

          <router-link
            to="/"
            class="rounded-md px-3 py-2 text-lg font-medium text-gray-300 hover:bg-gray-700 hover:text-orange-400"
            aria-current="page"
            >Vue3-Auth</router-link
          >
        </div>

        <div>
          <div class="flex space-x-4">
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
        </div>
      </div>
    </div>
  </nav>
</template>
