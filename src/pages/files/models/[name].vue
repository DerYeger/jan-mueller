<script setup lang="ts">
import { useModels } from '~/composables'

const props = defineProps<{ name: string }>()

const { name } = toRefs(props)

const modelPath = computed(() => `/static/files/models/${name.value}.mview`)

const router = useRouter()
const models = useModels()
watch(
  name,
  (name) => {
    if (models.find((model) => model.name === name) === undefined) {
      router.push('/files')
    }
  },
  { immediate: true }
)

const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col h-full">
    <h1 class="text-center">{{ t(`files.models.${name}.title`) }}</h1>
    <p class="text-center text-lighter">
      {{ t(`files.models.${name}.description`) }}
    </p>
    <div class="flex-1">
      <ClientOnly>
        <MarmosetViewer :src="modelPath" responsive />
      </ClientOnly>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: fullscreen
</route>
