<template>
  <v-btn
    rel="noopener"
    icon
    x-large
    target="_blank"
    :aria-label="name"
    :color="color"
    :href="href"
  >
    <v-icon x-large :class="color ? '' : 'text--primary'" v-text="icon" />
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
