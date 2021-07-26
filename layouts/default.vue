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
    <app-header v-model="drawerOpen" />
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
  data() {
    return {
      drawerOpen: this.$vuetify.breakpoint.lgAndUp,
    }
  },
  head() {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale,
      },
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('meta.description') as string,
        },
      ],
      link: [
        {
          rel: 'canonical',
          href: `https://jan-mueller.at${this.$route.path}/`,
        },
      ],
    }
  },
  computed: mapState(['breadcrumbs']),
})
</script>
