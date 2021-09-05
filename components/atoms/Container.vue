<template>
  <v-container
    :class="{ 'bound-width': boundWidth }"
    style="
      display: flex;
      justify-content: center;
      margin-left: auto;
      margin-right: auto;
      padding: 12px;
    "
  >
    <slot />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    boundWidth: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
