<template>
  <v-app-bar
    fixed
    app
    elevate-on-scroll
    dense
    :color="$vuetify.theme.dark ? '#121212' : 'white'"
  >
    <div>
      <v-app-bar-nav-icon
        v-show="$vuetify.breakpoint.mdAndDown"
        :aria-label="
          $t(drawerOpen ? 'actions.close-menu' : 'actions.open-menu')
        "
        style="margin-left: -16px"
        @click.stop="onNavIconClicked()"
      />
      <breadcrumbs v-show="$vuetify.breakpoint.lgAndUp" class="pa-0" />
    </div>
    <div
      style="display: flex; justify-content: center"
      :style="$vuetify.breakpoint.mdAndDown ? 'flex-basis: auto' : ''"
    >
      <content-search />
    </div>
    <div style="margin-right: -16px">
      <logo />
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    drawerOpen: {
      type: Boolean,
      required: true,
    },
    onNavIconClicked: {
      type: Function,
      required: true,
    },
  },
})
</script>
