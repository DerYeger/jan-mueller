<template>
  <div style="width: max-content">
    <v-btn
      v-for="locale of locales"
      :key="locale.code"
      plain
      x-small
      :to="switchLocalePath(locale.code)"
    >
      {{ locale.name }}
    </v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  data() {
    return {
      locales: [
        {
          code: 'de',
          name: 'DE',
        },
        {
          code: 'en',
          name: 'EN',
        },
      ],
    }
  },
})
</script>
