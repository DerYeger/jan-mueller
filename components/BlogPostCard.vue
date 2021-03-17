<template>
  <v-hover v-slot="{ hover }">
    <v-card
      :to="blogPost.path"
      :elevation="hover ? 12 : 2"
      :class="hover ? 'primary--text' : 'text'"
    >
      <v-img
        v-if="blogPost.image"
        :src="require('~/assets/images/' + blogPost.image)"
        :aspect-ratio="2"
        max-height="8rem"
      >
        <template #placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="primary" />
          </v-row>
        </template>
      </v-img>
      <v-card-title>{{ blogPost.title }}</v-card-title>
      <v-card-subtitle>{{ formatDate(blogPost.createdAt) }}</v-card-subtitle>
      <template v-if="hasTags(blogPost)">
        <v-divider class="mx-4" />
        <v-card-text>
          {{ $t('misc.tags') }}: {{ blogPost.tags.join(', ') }}
        </v-card-text>
      </template>
    </v-card>
  </v-hover>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { BlogPost, hasTags } from '~/model/blog-post'
import { formatDate } from '~/model/utils'

export default defineComponent({
  props: {
    blogPost: {
      type: Object as () => BlogPost,
      required: true,
    },
  },
  methods: {
    formatDate,
    hasTags,
  },
})
</script>
