<template>
  <v-btn
    rel="noopener"
    plain
    :aria-label="$t('actions.view-demo')"
    :href="href"
    target="_blank"
    :color="color"
    class="mb-4"
  >
    {{ $t('actions.view-demo') }}
    <v-icon class="ml-2" v-text="'mdi-television-play'" />
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
    color: {
      type: String,
      default: 'primary',
    },
  },
})
</script>
