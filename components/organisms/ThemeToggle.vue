<template>
  <v-btn
    icon
    x-small
    :aria-label="
      $t(useDarkTheme ? 'actions.use-light-theme' : 'actions.use-dark-theme')
    "
    @click="toggleTheme()"
  >
    <v-icon>{{ useDarkTheme ? mdiBrightness5 : mdiBrightness2 }}</v-icon>
  </v-btn>
</template>

<script lang="ts">
import { mdiBrightness2, mdiBrightness5 } from '@mdi/js'
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  data() {
    return {
      mdiBrightness2,
      mdiBrightness5,
    }
  },
  computed: {
    useDarkTheme(): boolean {
      return this.$colorMode.value === 'dark' || this.$colorMode.unknown
    },
  },
  watch: {
    useDarkTheme: {
      handler(value: boolean) {
        this.$vuetify.theme.dark = value
      },
      immediate: true,
    },
  },
  methods: {
    toggleTheme() {
      this.$colorMode.preference = this.useDarkTheme ? 'light' : 'dark'
    },
  },
})
</script>
