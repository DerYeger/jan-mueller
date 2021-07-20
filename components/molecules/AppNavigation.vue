<template>
  <v-list-item-group>
    <app-navigation-entry
      v-for="(route, index) in routes"
      :key="index"
      :route="route"
    />
    <source-repository-link />
  </v-list-item-group>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { routes } from '~/model/routes'

export default defineComponent({
  setup() {
    return {
      routes: Object.values(routes),
    }
  },
})
</script>
