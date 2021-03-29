<template>
  <div>
    <v-btn
      v-for="locale of locales"
      :key="locale.code"
      text
      class="ma-1"
      :to="switchLocalePath(locale.code)"
      :x-small="$vuetify.breakpoint.xs"
      :small="$vuetify.breakpoint.smAndUp"
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
