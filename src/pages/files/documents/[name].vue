<script setup lang="ts">
import { useDocuments } from '~/composables'

const props = defineProps<{ name: string }>()

const { name } = toRefs(props)

const documentPath = computed(() => `/static/files/documents/${name.value}.pdf`)

const router = useRouter()
const documents = useDocuments()
watch(
  name,
  (name) => {
    if (documents.find((document) => document.name === name) === undefined) {
      router.push('/files')
    }
  },
  { immediate: true }
)
</script>

<template>
  <embed :src="documentPath" class="w-full h-full" />
</template>

<route lang="yaml">
meta:
  layout: fullscreen
</route>
