<template>
  <v-btn icon @click="toggleTheme()">
    <v-icon v-text="useDarkTheme ? 'mdi-brightness-5' : 'mdi-brightness-2'" />
  </v-btn>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { mapMutations, mapState } from 'vuex'

export default defineComponent({
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
