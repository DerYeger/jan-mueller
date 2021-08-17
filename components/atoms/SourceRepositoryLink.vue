<template>
  <v-list-item
    rel="noopener"
    href="https://github.com/DerYeger/jan-mueller"
    target="_blank"
    class="unselectable source-link-container"
    role="link"
  >
    <v-list-item-icon>
      <v-icon>{{ mdiGithub }}</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>Website Source Code</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import { mdiGithub } from '@mdi/js'
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  data() {
    return {
      mdiGithub,
    }
  },
})
</script>
