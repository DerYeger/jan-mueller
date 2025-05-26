<script setup lang="ts">
import MasonryWall from '@yeger/vue-masonry-wall'

import type { GalleryImage } from '~/photographyUtils'

const props = defineProps<{ images: GalleryImage[] }>()
</script>

<template>
  <div class="flex justify-center bg-white md:p-2">
    <MasonryWall
      v-slot="{ item: image }"
      :items="props.images"
      :ssr-columns="1"
      :column-width="512"
      :gap="8"
      :max-columns="undefined"
      :key-mapper="(image: GalleryImage) => image.src"
      class="w-full"
    >
      <div
        class="h-0"
        :style="{ paddingBottom: `${100 * (1 / image.aspectRatio)}%` }"
      >
        <img
          :src="image.src"
          :alt="image.alt"
          :loading="image.lazy ? 'lazy' : 'eager'"
          draggable="false"
          decoding="async"
          class="w-full select-none shadow-2xl"
          style="pointer-events: none !important;"
        >
      </div>
    </MasonryWall>
  </div>
</template>
