<template>
  <div>
    <v-btn
      v-for="locale of locales"
      :key="locale.code"
      :to="switchLocalePath(locale.code)"
      text
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

<style scoped>
.v-btn {
  margin: 0.25rem;
}
</style>
