<template>
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
              v-for="project of displayedProjects"
              :key="project.slug"
              :project="project"
              small
            />
          </div>
          <v-btn
            :to="localePath(routes.projects.to)"
            color="white"
            text
            x-large
          >
            {{ $t('misc.all-projects') }}
            <v-icon class="ml-1">{{ mdiArrowRight }}</v-icon>
          </v-btn>
        </section>
        <section id="blog" class="mt-12">
          <h1 class="text-center">{{ $t(routes.blog.title) }}</h1>
          <div class="card-row">
            <blog-post-card
              v-for="post of displayedBlogPosts"
              :key="post.slug"
              :blog-post="post"
              small
            />
          </div>
          <v-btn :to="localePath(routes.blog.to)" color="white" text x-large>
            {{ $t('misc.all-posts') }}
            <v-icon class="ml-1">{{ mdiArrowRight }}</v-icon>
          </v-btn>
        </section>
      </container>
    </wave>
  </wave>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { mdiArrowRight } from '@mdi/js'
import { routes } from '~/model/routes'
import { Project } from '~/model/project'
import { BlogPost } from '~/model/blog-post'

export default defineComponent({
  props: {
    projects: {
      type: Array as PropType<Project[]>,
      required: true,
    },
    blogPosts: {
      type: Array as PropType<BlogPost[]>,
      required: true,
    },
    count: {
      type: Number,
      default: 3,
    },
  },
  data() {
    return {
      mdiArrowRight,
      routes,
    }
  },
  computed: {
    displayedProjects(): Project[] {
      return this.projects.slice(0, this.count)
    },
    displayedBlogPosts(): BlogPost[] {
      return this.blogPosts.slice(0, this.count)
    },
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
    > .card-row {
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
