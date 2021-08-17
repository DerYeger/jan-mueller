<template>
  <v-btn
    rel="noopener"
    plain
    :aria-label="$t('actions.view')"
    :href="href"
    target="_blank"
    :color="color"
    class="mb-4"
  >
    {{ $t('actions.view') }}
    <v-icon class="ml-2">{{ mdiTelevisionPlay }}</v-icon>
  </v-btn>
</template>

<script lang="ts">
import { mdiTelevisionPlay } from '@mdi/js'
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
  data() {
    return {
      mdiTelevisionPlay,
    }
  },
})
</script>
