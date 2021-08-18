<template>
  <v-hover v-slot="{ hover }">
    <v-card
      :to="blogPost.path"
      :elevation="hover ? 6 : 2"
      :class="hover ? 'primary--text' : 'text'"
    >
      <v-img
        v-if="blogPost.image"
        :src="require('~/assets/images/blog/' + blogPost.image)"
        :aspect-ratio="16 / 9"
        max-height="12rem"
      >
        <template #placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="primary" />
          </v-row>
        </template>
      </v-img>
      <v-card-title class="text-h5" style="word-break: normal">
        {{ blogPost.title }}
      </v-card-title>
      <v-card-subtitle>
        <i>
          {{ $d(new Date(blogPost.createdAt), 'short') }} ·
          {{ blogPost.readingTime }}
        </i>
      </v-card-subtitle>
      <v-divider class="mx-4" />
      <v-card-text>
        {{ blogPost.description }}
        <tag-list
          v-if="hasTags(blogPost)"
          :tags="blogPost.tags"
          class="mt-2"
          small
        />
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { BlogPost, hasTags } from '~/model/blog-post'

export default defineComponent({
  props: {
    blogPost: {
      type: Object as () => BlogPost,
      required: true,
    },
  },
  methods: {
    hasTags,
  },
})
</script>
