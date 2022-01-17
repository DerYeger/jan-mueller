<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <Header />
  <Main class="flex-center flex-col">
    <div>
      <p class="text-4xl text-red-500">
        <carbon-warning class="inline-block" />
      </p>
    </div>
    <router-view />
    <div>
      <button class="icon-btn m-3 text-2xl mt-8" @click="router.back()">
        <carbon-undo />
      </button>
    </div>
  </Main>
  <Footer />
</template>
