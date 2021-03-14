<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :clipped="true" fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="localePath(item.to)"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="$t(item.title)" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="true" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="$t(title)" />
      <v-spacer />
      <breadcrumbs />
      <v-spacer />
      <language-toggle />
    </v-app-bar>
    <v-main>
      <v-container class="page-container">
        <nuxt />
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}, Jan Müller</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { routes } from '~/model/routes'

export default defineComponent({
  data() {
    return {
      drawer: false,
      items: Object.values(routes),
    }
  },
  head() {
    return {
      title: (this.$t as any)(this.$store.state.title),
    }
  },
  computed: {
    title() {
      return this.$store.state.title
    },
    breadcrumbs() {
      return this.$store.state.breadcrumbs
    },
  },
})
</script>
