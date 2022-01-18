<script setup lang="ts">
const props = defineProps<{ name: string }>()

const { name } = toRefs(props)

const documentPath = computed(() => `/documents/${name.value}.pdf`)
</script>

<template>
  <embed :src="documentPath" class="w-full h-full" />
</template>

<route lang="yaml">
meta:
  layout: fullscreen
</route>
