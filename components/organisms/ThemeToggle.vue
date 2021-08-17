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
import { mapMutations, mapState } from 'vuex'

export default defineComponent({
  data() {
    return {
      mdiBrightness2,
      mdiBrightness5,
    }
  },
  computed: mapState(['useDarkTheme']),
  watch: {
    useDarkTheme(val) {
      this.$vuetify.theme.dark = val
    },
  },
  mounted() {
    this.$store.commit('loadTheme')
  },
  methods: mapMutations(['toggleTheme']),
})
</script>
