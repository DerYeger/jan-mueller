<template>
  <v-btn
    rel="noopener"
    icon
    large
    height="48"
    width="48"
    target="_blank"
    :aria-label="name"
    :color="color"
    :href="href"
    class="ma-0"
  >
    <v-icon large :class="{ 'text--primary': !color }" v-text="icon" />
  </v-btn>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    href: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: undefined,
    },
  },
})
</script>
