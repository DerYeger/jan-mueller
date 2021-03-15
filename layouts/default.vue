<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :clipped="true" fixed app dark>
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
    <v-app-bar :clipped-left="true" fixed app dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="$t(title)" />
      <v-spacer />
      <content-search />
      <v-spacer />
      <logo />
    </v-app-bar>
    <v-main>
      <breadcrumbs />
      <v-container class="page-container">
        <nuxt />
      </v-container>
    </v-main>
    <v-footer app dark>
      <span>&copy; {{ new Date().getFullYear() }}, Jan Müller</span>
      <v-spacer />
      <theme-toggle />
      <v-spacer />
      <language-toggle />
    </v-footer>
  </v-app>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { mapState } from 'vuex'
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
      title: this.$t(this.$store.state.title),
    }
  },
  computed: mapState(['title', 'breadcrumbs']),
})
</script>
