<script lang="ts" setup>
import { MarmosetViewer } from 'vue-marmoset-viewer'

const { height = 300 } = defineProps<{ src: string, height?: number }>()
</script>

<template>
  <div class="not-prose overflow-hidden rounded shadow-md">
    <MarmosetViewer :src="src" responsive :height="height" />
  </div>
</template>
