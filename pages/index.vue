<template>
  <v-row justify="center" align="center">
    This website is under construction.
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { routes } from '~/model/routes'

export default defineComponent({
  mounted() {
    this.$store.commit('setTitle', routes.home.title)
  },
})
</script>
