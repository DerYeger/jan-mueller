<script setup lang="ts">
const props = defineProps<{ title: string }>()

const { title } = toRefs(props)

const { t } = useI18n()
</script>

<template>
  <aside class="text-center py-4">
    <h2 class="subheading">{{ t(title) }}</h2>
    <div class="text-lg md-text-xl children:ma-1">
      <slot />
    </div>
  </aside>
</template>
