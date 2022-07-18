<script setup lang="ts">
import { useSlideIn } from '~/composables'

const container = ref<HTMLElement>()
useSlideIn(container, 'slide-in-from-right')
</script>

<template>
  <div ref="container">
    <IconList title="languages">
      <logos-kotlin-icon />
      <logos-java />
      <logos-haskell-icon />
      <logos-python />
      <logos-typescript-icon />
      <logos-javascript />
      <vscode-icons-file-type-html />
      <vscode-icons-file-type-css />
      <logos-sass />
    </IconList>
  </div>
</template>
