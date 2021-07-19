<template>
  <marmoset-viewer :src="src" responsive class="model-viewer elevation-6" />
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    src: {
      type: String,
      required: true,
    },
  },
})
</script>
