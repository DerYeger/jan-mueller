<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
      :expand-on-hover="$vuetify.breakpoint.lgAndUp"
    >
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
    </v-navigation-drawer>
    <v-app-bar
      fixed
      app
      dense
      elevate-on-scroll
      :color="$vuetify.theme.dark ? '#121212' : 'white'"
    >
      <div
        v-if="$vuetify.breakpoint.mdAndDown"
        class="flex-item"
        style="margin-left: -16px"
      >
        <v-app-bar-nav-icon
          :aria-label="$t(drawer ? 'actions.close-menu' : 'actions.open-menu')"
          @click.stop="drawer = !drawer"
        />
      </div>
      <div v-else class="flex-item">
        <breadcrumbs class="pa-0" />
      </div>
      <div
        class="flex-item"
        style="display: flex; justify-content: center"
        :style="$vuetify.breakpoint.mdAndDown ? 'flex-basis: auto' : ''"
      >
        <content-search />
      </div>
      <div class="flex-item" style="margin-right: -16px">
        <logo />
      </div>
    </v-app-bar>
    <v-main>
      <breadcrumbs
        v-if="$vuetify.breakpoint.mdAndDown && breadcrumbs.length > 0"
        class="pa-3"
      />
      <v-container class="page-container">
        <nuxt />
      </v-container>
    </v-main>
    <v-footer app dark fixed>
      <div class="flex-item" style="flex: 2">
        <span style="font-size: 0.75rem" class="unselectable">
          &copy; {{ new Date().getFullYear() }}, Jan Müller
        </span>
      </div>
      <div class="flex-item">
        <theme-toggle />
      </div>
      <div class="flex-item">
        <language-toggle />
      </div>
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

<style lang="scss">
.source-link-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

.v-toolbar__content,
.v-footer {
  width: 100%;
  display: flex;
}

.flex-item {
  flex: 1;
}

.flex-item:first-child > * {
  margin-right: auto;
}

.flex-item:last-child > * {
  margin-left: auto;
}
</style>
