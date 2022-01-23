<script setup lang="ts">
import { RouteWithFrontmatter } from '~/types'

const router = useRouter()

const routes = (router.getRoutes() as unknown as RouteWithFrontmatter[])
  .filter(
    (route) => route.path.startsWith('/blog/') && route.meta.frontmatter?.date
  )
  .sort(
    (a, b) =>
      +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date)
  )

const posts = computed(() => routes)

const { t } = useI18n()
</script>

<template>
  <masonry-wall
    v-slot="{ item: post }"
    :items="posts"
    :ssr-columns="1"
    :column-width="300"
    :gap="16"
    class="text-sm"
  >
    <router-link :to="post.path" class="no-underline">
      <div class="card">
        <span class="text-xl">
          {{ post.meta.frontmatter.title }}
        </span>
        <span class="text-lighter">
          <Date :date="post.meta.frontmatter.date" format="default" />
          <Dot />
          <span>{{ t(post.meta.frontmatter.language) }}</span>
        </span>
        <span class="text-light">
          {{ post.meta.frontmatter.description }}
        </span>
      </div>
    </router-link>
  </masonry-wall>
</template>
