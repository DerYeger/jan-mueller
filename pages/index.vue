<template>
  <v-row justify="center" align="center">
    This website is under construction.
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { routes } from '~/model/routes'

export default Vue.extend({
  mounted() {
    this.$store.commit('setTitle', routes.home.title)
  },
})
</script>
