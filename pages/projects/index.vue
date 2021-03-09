<template>
  <div>
    <div v-for="project of projects" :key="project.slug">
      <v-card :to="{ name: 'projects-slug', params: { slug: project.slug } }">
        <v-card-title class="headline">{{ project.title }}</v-card-title>
        <v-card-text>
          <p>{{ project.description }}</p>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { contentFunc } from '@nuxt/content/types/content'
import Vue from 'vue'
import { Project } from '~/model/project'
import { routes } from '~/model/routes'

export default Vue.extend({
  async asyncData({ $content }: { $content: contentFunc }) {
    const projects = (await $content('projects')
      .only(['title', 'slug', 'description'])
      .sortBy('title', 'asc')
      .fetch<Project>()) as Project[]

    return {
      projects,
    }
  },
  mounted() {
    this.$store.commit('setTitle', routes.projects.title)
  },
})
</script>
