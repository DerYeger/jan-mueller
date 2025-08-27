<script lang="ts" setup>
import { MarmosetViewer } from 'vue-marmoset-viewer'

const { height = 300 } = defineProps<{ src: string, height?: number }>()
</script>

<template>
  <div class="not-prose overflow-hidden rounded shadow-md will-change-transform">
    <MarmosetViewer :src="src" responsive :height="height" />
  </div>
</template>

<style>
#marmosetUI > img {
  height: 100%;
  object-fit: cover;
  position: static !important;
  transform: none !important;
  width: 100%;
}
</style>
