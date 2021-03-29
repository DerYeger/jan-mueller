<template>
  <div class="response-list">
    <v-chip
      v-for="(element, index) of elements"
      :key="index"
      class="program-chip"
    >
      {{ element }}
    </v-chip>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    elements: {
      type: Array as () => string[],
      required: true,
    },
  },
})
</script>
