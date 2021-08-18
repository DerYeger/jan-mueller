<template>
  <v-img
    :src="require(`~/assets/images/${src}`)"
    :alt="alt"
    :height="height"
    class="elevation-1"
    :class="{ rounded: $vuetify.breakpoint.mdAndUp }"
  >
    <template #placeholder>
      <v-row class="fill-height ma-0" align="center" justify="center">
        <v-progress-circular indeterminate color="primary" />
      </v-row>
    </template>
  </v-img>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: 'Banner',
    },
    height: {
      type: String,
      required: true,
    },
    allowFullscreen: {
      type: Boolean,
      default: true,
    },
  },
})
</script>
