<template>
  <v-hover v-slot="{ hover }">
    <v-card
      :to="project.path"
      :elevation="hover ? 12 : 2"
      :class="hover ? 'primary--text' : 'text'"
    >
      <v-img
        v-if="project.image"
        :src="require('~/assets/images/' + project.image)"
        :aspect-ratio="2"
        max-height="8rem"
      >
        <template #placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="primary" />
          </v-row>
        </template>
      </v-img>
      <v-card-title>{{ project.title }}</v-card-title>
      <v-card-subtitle>{{ project.description }}</v-card-subtitle>
    </v-card>
  </v-hover>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Project } from '~/model/project'

export default defineComponent({
  props: {
    project: {
      type: Object as () => Project,
      required: true,
    },
  },
})
</script>
