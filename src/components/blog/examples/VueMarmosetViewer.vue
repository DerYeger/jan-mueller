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
  <div class="shadow-md rounded overflow-hidden relative isolate not-prose">
    <MarmosetViewer :src="src" responsive :height="height" />
  </div>
</template>
