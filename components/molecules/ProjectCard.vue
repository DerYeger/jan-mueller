<template>
  <v-hover v-slot="{ hover }">
    <v-card
      :to="project.path"
      :elevation="hover ? 6 : 2"
      :class="hover ? 'secondary--text' : 'text'"
      class="project-card"
    >
      <v-img
        v-if="project.thumbnail"
        :src="require('~/assets/images/projects/' + project.thumbnail)"
        :aspect-ratio="2"
        contain="contain"
        :max-height="small ? '6rem' : '8rem'"
      >
        <template #placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="primary" />
          </v-row>
        </template>
      </v-img>
      <v-card-title class="text-h5 card-title" style="word-break: normal">
        {{ project.title }}
        <v-spacer style="min-width: 1rem" />
        <div>
          <v-icon
            v-if="
              project.repository ||
              (project.repositories && project.repositories.length > 0)
            "
            small
          >
            {{ mdiGithub }}
          </v-icon>
          <v-icon v-if="project.demo" small>
            {{ mdiTelevisionPlay }}
          </v-icon>
        </div>
      </v-card-title>
      <v-divider v-show="!small" class="mx-4" />
      <v-card-text v-show="!small">{{ project.description }}</v-card-text>
    </v-card>
  </v-hover>
</template>

<script lang="ts">
import { mdiGithub, mdiTelevisionPlay } from '@mdi/js'
import { defineComponent } from '@nuxtjs/composition-api'
import { Project } from '~/model/project'

export default defineComponent({
  props: {
    project: {
      type: Object as () => Project,
      required: true,
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      mdiGithub,
      mdiTelevisionPlay,
    }
  },
})
</script>
