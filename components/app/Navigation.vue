<template>
  <div style="height: 100%">
    <v-list>
      <v-list-item
        v-for="(route, i) in routes"
        :key="i"
        :to="localePath(route.to)"
        router
        exact
      >
        <v-list-item-action>
          <v-icon>{{ route.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="$t(route.title)" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list-item
      rel="noopener"
      href="https://github.com/DerYeger/jan-mueller"
      target="_blank"
      class="unselectable source-link-container"
    >
      <v-list-item-action>
        <v-icon>fab fa-github</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Website Source Code</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </div>
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

<style>
.source-link-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
