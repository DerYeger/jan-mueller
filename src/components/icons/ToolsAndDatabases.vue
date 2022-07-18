<script setup lang="ts">
import { useSlideIn } from '~/composables'

const container = ref<HTMLElement>()
useSlideIn(container, 'slide-in-from-right')
</script>

<template>
  <div ref="container">
    <IconList title="tools-and-databases">
      <logos-cypress-icon />
      <logos-docker-icon />
      <logos-git-icon />
      <logos-gradle />
      <vscode-icons-file-type-mongo />
      <logos-nginx />
      <logos-nodejs-icon />
      <logos-postgresql />
      <logos-vitejs />
    </IconList>
  </div>
</template>
