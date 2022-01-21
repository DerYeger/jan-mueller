<script setup lang="ts">
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
    <router-link :to="`/files/${document.path}`" class="no-underline">
      <div class="card">
        <span class="text-xl">
          {{ t(`documents.${document.name}.title`) }}
        </span>
        <!--        <span class="text-lighter">-->
        <!--          <Date :date="document.date" format="default" />-->
        <!--          ·-->
        <!--          <span>{{ t(document.language) }}</span>-->
        <!--        </span>-->
        <span class="text-light">
          {{ t(`documents.${document.name}.description`) }}
        </span>
      </div>
    </router-link>
  </masonry-wall>
</template>
