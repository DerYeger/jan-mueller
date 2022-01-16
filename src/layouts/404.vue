<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <main class="flex-center flex-col pa-4 container m-auto">
    <Navigation />
    <div class="text-sm">
      <p class="text-4xl text-red-500">
        <carbon-warning class="inline-block" />
      </p>
    </div>
    <router-view />
    <div>
      <button class="icon-btn m-3 text-2xl mt-8" @click="router.back()">
        <carbon-undo class="text-green-900 dark:text-green-300" />
      </button>
    </div>
  </main>
</template>
