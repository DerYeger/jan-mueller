<template>
  <div>
    <container bound-width>
      <section>
        <v-row>
          <v-col>
            <v-row>
              <v-col
                cols="12"
                sm="auto"
                class="d-flex justify-center"
                align-self="center"
              >
                <avatar />
              </v-col>
              <v-col align-self="center">
                <h1 class="text-center text-sm-left">
                  {{ $t('misc.about-me') }}
                </h1>
                <quick-facts />
                <nuxt-content :document="paragraphs[0]" class="mb-n4" />
              </v-col>
            </v-row>
            <v-row class="mt-sm-8 flex-wrap-reverse">
              <v-col align-self="center">
                <nuxt-content :document="paragraphs[1]" class="mb-n4" />
              </v-col>
              <v-col cols="12" sm="5" align-self="center">
                <aside class="my-8 my-sm-0">
                  <h2 class="text-center text-sm-right">
                    {{ $t('misc.accounts') }}
                  </h2>
                  <account-link-row class="justify-center justify-sm-end" />
                </aside>
              </v-col>
            </v-row>
            <v-row class="mt-sm-8">
              <v-col cols="12" sm="6" align-self="center">
                <aside class="my-8 my-sm-0">
                  <h2 class="text-center text-sm-left">
                    {{ $t('misc.languages') }}
                  </h2>
                  <language-list class="justify-center justify-sm-start" />
                </aside>
              </v-col>
              <v-col align-self="center">
                <nuxt-content :document="paragraphs[2]" class="mb-n4" />
              </v-col>
            </v-row>
            <v-row class="mt-sm-8 flex-wrap-reverse">
              <v-col align-self="center">
                <nuxt-content :document="paragraphs[3]" class="mb-n4" />
              </v-col>
              <v-col cols="12" sm="6" align-self="center">
                <aside class="my-8 my-sm-0">
                  <h2 class="text-center text-sm-right">
                    {{ $t('misc.software') }}
                  </h2>
                  <software-list class="justify-center justify-sm-end" />
                </aside>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </section>
    </container>
    <wave-section :projects="projects" :blog-posts="blogPosts" />
    <container bound-width>
      <section>
        <v-row>
          <v-col> </v-col>
        </v-row>
      </section>
    </container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Context } from '@nuxt/types'
import { localizeDocumentPaths, routes } from '~/model/routes'
import { generateSocialTags } from '~/model/meta'
import { Paragraph } from '~/model/paragraph'
import { Project } from '~/model/project'
import { BlogPost } from '~/model/blog-post'

const count = 3

export default defineComponent({
  layout: 'uncontained',
  async asyncData(context: Context) {
    const locale = context.app.i18n.locale
    const paragraphs = (await context
      .$content(`${locale}/home`)
      .sortBy('part')
      .fetch()) as Paragraph[]
    const projects = (await context
      .$content(`${locale}/projects`)
      .sortBy('title')
      .fetch()) as Project[]
    const blogPosts = (await context
      .$content('/en/blog')
      .sortBy('date', 'desc')
      .fetch()) as BlogPost[]
    return {
      paragraphs,
      projects: localizeDocumentPaths(projects.slice(0, count), locale),
      blogPosts: localizeDocumentPaths(blogPosts.slice(0, count), locale),
      remainingProjectsCount: projects.length - count,
      remainingBlogPostsCount: blogPosts.length - count,
    }
  },
  data() {
    return {
      routes,
    }
  },
  head() {
    const title = this.$t(routes.home.title) as string
    const description = this.$t('meta.description') as string
    return {
      title,
      meta: [...generateSocialTags(title, description)],
    }
  },
  mounted() {
    this.$store.commit('setBreadcrumbs', [])
  },
})
</script>

<style lang="scss" scoped>
h2 {
  margin-bottom: 0.25em;
}
</style>
