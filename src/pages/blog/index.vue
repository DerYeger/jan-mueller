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

const { d } = useI18n()
</script>

<template>
  <masonry-wall :items="posts" :ssr-columns="1" :column-width="300" :gap="16">
    <template #default="{ item }">
      <router-link :to="item.path" class="no-underline">
        <div class="card">
          <span class="text-xl">
            {{ item.meta.frontmatter.title }}
          </span>
          <span class="text-sm text-lighter">
            {{ d(item.meta.frontmatter.date) }}
          </span>
          <span class="text-light">
            {{ item.meta.frontmatter.description }}
          </span>
        </div>
      </router-link>
    </template>
  </masonry-wall>
</template>
