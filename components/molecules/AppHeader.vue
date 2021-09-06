<template>
  <v-app-bar
    fixed
    app
    elevate-on-scroll
    dense
    :color="$vuetify.theme.dark ? '#121212' : 'white'"
  >
    <div class="ml-n4 ml-lg-0">
      <v-app-bar-nav-icon
        :aria-label="$t(value ? 'actions.close-menu' : 'actions.open-menu')"
        class="hidden-lg-and-up"
        @click="$emit('input', !value)"
      >
        <v-icon>{{ mdiMenu }}</v-icon>
      </v-app-bar-nav-icon>
      <breadcrumbs class="pa-0 hidden-md-and-down" />
    </div>
    <div class="d-flex justify-center ml-lg-n14 flex-fill">
      <content-search />
    </div>
    <div style="margin-right: -16px">
      <logo />
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import { mdiMenu } from '@mdi/js'
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      mdiMenu,
    }
  },
})
</script>

<style>
.v-app-bar {
  transition: background 0s;
}
</style>
