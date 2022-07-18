<script setup lang="ts">
import { useSlideIn } from '~/composables'

const container = ref<HTMLElement>()
useSlideIn(container, 'slide-in-from-left')
</script>

<template>
  <div ref="container">
    <IconList title="frameworks-and-libraries">
      <logos-android-icon />
      <logos-angular-icon />
      <logos-d3 />
      <logos-nuxt-icon />
      <logos-react />
      <logos-spring-icon />
      <logos-vue />
    </IconList>
  </div>
</template>
