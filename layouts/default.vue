<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawerOpen"
      fixed
      app
      :expand-on-hover="$vuetify.breakpoint.lgAndUp"
    >
      <app-sidebar />
    </v-navigation-drawer>
    <app-header :drawer-open="drawerOpen" :on-nav-icon-clicked="toggleDrawer" />
    <v-main>
      <breadcrumbs
        v-if="$vuetify.breakpoint.mdAndDown && breadcrumbs.length > 0"
        class="pa-3"
      />
      <v-container class="page-container">
        <nuxt />
      </v-container>
    </v-main>
    <app-footer />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { mapState } from 'vuex'

export default defineComponent({
  layout: 'empty',
  data() {
    return {
      drawerOpen: false,
    }
  },
  computed: mapState(['breadcrumbs']),
  methods: {
    toggleDrawer() {
      this.drawerOpen = !this.drawerOpen
    },
  },
})
</script>
