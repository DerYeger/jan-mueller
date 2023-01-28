<script lang="ts">
import { defineComponent } from 'vue'
import * as MarmosetViewer from 'vue-marmoset-viewer'

export default defineComponent({
  components: {
    MarmosetViewer: MarmosetViewer.MarmosetViewer,
  },
  props: {
    src: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      default: 300,
    },
  },
})
</script>

<template>
  <div class="not-prose relative isolate overflow-hidden rounded shadow-md">
    <MarmosetViewer :src="src" responsive :height="height" />
  </div>
</template>
