<template>
  <iframe
    src="https://graph.yeger.eu"
    title="Graph Editor"
    width="100%"
    class="elevation-6"
  />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    src: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
})
</script>

<style scoped>
iframe {
  border-width: 0;
  height: clamp(20rem, 40vh, 60rem);
  display: block;
}
</style>
