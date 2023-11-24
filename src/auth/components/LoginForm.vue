<script setup lang="ts"></script>

<template>
  <div class="space-y-4 px-4 py-8 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
    <div class="relative">
      <input
        autocomplete="off"
        id="email"
        name="email"
        type="text"
        class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-teal-600 focus:outline-none"
        placeholder="Email address"
      />
      <label
        for="email"
        class="peer-placeholder-shown:text-gray-440 absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
        >Email Address</label
      >
    </div>
    <div class="relative">
      <input
        autocomplete="off"
        id="password"
        name="password"
        type="password"
        class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-teal-600 focus:outline-none"
        placeholder="Password"
      />
      <label
        for="password"
        class="peer-placeholder-shown:text-gray-440 absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
        >Password</label
      >
    </div>
    <div class="relative">
      <button
        type="submit"
        class="mt-3 w-full rounded-md bg-teal-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-300"
      >
        Submit
      </button>
    </div>

    <p class="text-sm font-light text-gray-500">
      <span>Don't have an account yet? </span>
      <a href="#" class="ml-2 p-2 font-medium text-teal-600 hover:bg-gray-100 hover:text-orange-600"
        >Sign up</a
      >
    </p>
  </div>
</template>
