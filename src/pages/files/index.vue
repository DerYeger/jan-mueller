<script setup lang="ts">
import Dot from '~/components/Dot.vue'
import { useDocuments, useModels } from '~/composables'

const documents = useDocuments()
const models = useModels()
const files = [...documents, ...models]

const { t } = useI18n()
</script>

<template>
  <masonry-wall
    v-slot="{ item: document }"
    :items="files"
    :ssr-columns="1"
    :column-width="300"
    :gap="16"
    class="text-sm"
  >
    <router-link
      :to="`/files/${document.type}/${document.name}`"
      class="no-underline"
    >
      <div class="card">
        <span class="text-xl">
          {{ t(`files.${document.type}.${document.name}.title`) }}
        </span>
        <span class="text-lighter">
          <Date
            :date="document.date"
            :format="document.dateFormat ?? 'default'"
          />
          <template v-if="document.language">
            <Dot />
            <span>{{ t(document.language) }}</span>
          </template>
        </span>
        <span class="text-light">
          {{ t(`files.${document.type}.${document.name}.description`) }}
        </span>
      </div>
    </router-link>
  </masonry-wall>
</template>
