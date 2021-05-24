<template>
  <v-hover v-slot="{ hover }">
    <v-card
      :to="project.path"
      :elevation="hover ? 12 : 2"
      :class="hover ? 'primary--text' : 'text'"
      class="project-card"
    >
      <v-img
        v-if="project.thumbnail"
        :src="require('~/assets/images/projects/' + project.thumbnail)"
        aspect-ratio="2"
        contain="contain"
        max-height="16rem"
      >
        <template #placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="primary" />
          </v-row>
        </template>
      </v-img>
      <v-card-title class="headline card-title" style="word-break: normal">
        {{ project.title }}
        <v-spacer style="min-width: 1rem" />
        <div>
          <v-icon v-if="project.repository" small v-text="'fab fa-github'" />
          <v-icon v-if="project.demo" small v-text="'mdi-television-play'" />
        </div>
      </v-card-title>
      <v-divider class="mx-4" />
      <v-card-text>{{ project.description }}</v-card-text>
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

<style>
.project-card .headline {
  display: flex;
  flex-wrap: nowrap;
}
</style>
