<script setup lang="ts">
import MasonryWall from '@yeger/vue-masonry-wall'

import type { GalleryImage } from '~/photographyUtils'

const props = defineProps<{ images: GalleryImage[] }>()
</script>

<template>
  <div class="flex justify-center bg-white py-2 md:px-2">
    <MasonryWall
      v-slot="{ item: image, columnCount }"
      :items="props.images"
      :ssr-columns="1"
      :column-width="448"
      :gap="8"
      :max-columns="undefined"
      :key-mapper="(image: GalleryImage) => image.src"
      class="w-full"
    >
      <div
        :class="{ 'mx-auto max-w-[448px]': columnCount === 1 }"
        :style="{ aspectRatio: String(image.aspectRatio) }"
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
