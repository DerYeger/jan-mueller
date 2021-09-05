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
    <wave
      :offset-top="-64"
      :offset-bottom="320"
      class="mb-4"
      :color="$vuetify.theme.currentTheme.secondary"
      :speed-multiplier="0.7"
    >
      <wave :color="$vuetify.theme.currentTheme.accent" :speed-multiplier="0.5">
        <container bound-width class="d-block">
          <section id="projects">
            <h1 class="text-center">{{ $t(routes.projects.title) }}</h1>
            <div class="card-row">
              <project-card
                v-for="project of projects"
                :key="project.slug"
                :project="project"
                small
              />
            </div>
            <v-btn
              v-if="remainingProjectsCount > 0"
              :to="localePath(routes.projects.to)"
              color="secondary"
            >
              {{ $t('misc.view-n-more', [remainingProjectsCount]) }}
            </v-btn>
          </section>
          <section id="blog" class="mt-12">
            <h1 class="text-center">{{ $t(routes.blog.title) }}</h1>
            <div class="card-row">
              <blog-post-card
                v-for="post of blogPosts"
                :key="post.slug"
                :blog-post="post"
                small
              />
            </div>
            <v-btn
              v-if="remainingBlogPostsCount > 0"
              :to="localePath(routes.blog.to)"
              color="secondary"
            >
              {{ $t('misc.view-n-more', [remainingBlogPostsCount]) }}
            </v-btn>
          </section>
        </container>
      </wave>
    </wave>
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

#projects,
#blog {
  display: flex;
  flex-direction: column;
  align-items: center;

  > h1 {
    color: white;
  }

  > .card-row {
    display: flex;
    width: 100%;

    > * {
      width: calc(100% / 3);
      height: fit-content;
      height: -moz-fit-content;
    }

    > * + * {
      margin-left: 0.75rem;
    }
  }

  @media only screen and (max-width: 600px) {
    > div {
      flex-direction: column;

      > * {
        width: 100%;
      }

      > * + * {
        margin-left: 0;
        margin-top: 0.75rem;
      }
    }
  }

  .v-btn {
    margin-top: 1rem;
    width: fit-content;
    width: -moz-fit-content;
  }
}
</style>
