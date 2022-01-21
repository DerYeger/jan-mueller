<script setup lang="ts">
const props = defineProps<{ file: string }>()

const { file } = toRefs(props)

const documentPath = computed(() => `/static/files/${file.value}`)

const fileType = computed(() => documentPath.value.split('.').pop())

const isEmbeddable = computed(() => ['pdf'].includes(fileType.value ?? ''))
</script>

<template>
  <embed v-if="isEmbeddable" :src="documentPath" class="w-full h-full" />
  <MarmosetViewer v-else :src="documentPath" responsive />
</template>

<route lang="yaml">
meta:
  layout: fullscreen
</route>
