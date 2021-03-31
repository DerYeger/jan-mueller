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
      <v-list-item class="source-link-container">
        <a
          rel="noopener"
          href="https://github.com/DerYeger/jan-mueller"
          target="_blank"
        >
          Website Source Code
        </a>
      </v-list-item>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="true" fixed app dark>
      <v-app-bar-nav-icon
        :aria-label="$t(drawer ? 'actions.close-menu' : 'actions.open-menu')"
        @click.stop="drawer = !drawer"
      />
      <v-spacer />
      <content-search />
      <v-spacer />
      <logo />
    </v-app-bar>
    <v-main>
      <breadcrumbs v-if="breadcrumbs.length > 0" />
      <v-container class="page-container">
        <nuxt />
      </v-container>
    </v-main>
    <v-footer app dark>
      <span :style="$vuetify.breakpoint.xs ? 'font-size: 0.8rem' : ''">
        &copy; {{ new Date().getFullYear() }}, Jan Müller
      </span>
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
      htmlAttrs: {
        lang: this.$i18n.locale,
      },
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('meta.description'),
        },
      ],
    }
  },
  computed: mapState(['title', 'breadcrumbs']),
})
</script>

<style lang="scss" scoped>
.source-link-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 0.8rem;

  a {
    color: unset;
    text-decoration: none;
    width: 100%;
    text-align: center;
  }
}
</style>
