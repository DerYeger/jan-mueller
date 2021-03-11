<template>
  <div>
    <div v-for="project of projects" :key="project.slug">
      <v-card :to="project.path">
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
import { defineComponent } from '@nuxtjs/composition-api'
import { NuxtAppOptions } from '@nuxt/types'
import { Project } from '~/model/project'
import { localizePaths, routes } from '~/model/routes'

export default defineComponent({
  async asyncData({
    app,
    $content,
  }: {
    app: NuxtAppOptions
    $content: contentFunc
  }) {
    const projects = (await $content('en/projects')
      .only(['title', 'slug', 'description'])
      .sortBy('title', 'asc')
      .fetch<Project>()) as Project[]
    return {
      projects: localizePaths(projects, app),
    }
  },
  mounted() {
    this.$store.commit('setTitle', routes.projects.title)
  },
})
</script>
