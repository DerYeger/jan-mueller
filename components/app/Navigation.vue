<template>
  <v-list-item-group>
    <v-list-item
      v-for="(route, index) in routes"
      :key="index"
      :to="localePath(route.to)"
      exact
    >
      <v-list-item-icon>
        <v-icon v-text="route.icon" />
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title v-text="$t(route.title)" />
      </v-list-item-content>
    </v-list-item>
    <source-repository-link />
  </v-list-item-group>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { routes } from '~/model/routes'

export default defineComponent({
  data() {
    return {
      routes: Object.values(routes),
    }
  },
})
</script>
