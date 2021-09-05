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
        class="pa-3 mobile-breadcrumbs"
        small
      />
      <nuxt />
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
    const path = this.$route.path.length === 1 ? '' : this.$route.path
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
          href: `${this.$host}${path}/`,
        },
      ],
    }
  },
  computed: mapState(['breadcrumbs']),
})
</script>

<style lang="scss">
.mobile-breadcrumbs {
  flex-wrap: wrap !important;
  margin-top: -0.5rem;

  li {
    margin-top: 0.5rem;
  }
}
</style>
