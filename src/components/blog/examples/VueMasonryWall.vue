<script lang="ts">
import MasonryWall from '@yeger/vue-masonry-wall'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    MasonryWall,
  },
  data() {
    return {
      items: [50, 75, 75, 100, 50, 50, 75, 150, 125, 175, 50, 100, 125],
    }
  },
})
</script>

<template>
  <MasonryWall :items="items" :ssr-columns="1" :column-width="100" :gap="16">
    <template #default="{ item, index }">
      <div
        :style="{ height: `${item}px` }"
        class="card flex items-center justify-center"
      >
        {{ index }}
      </div>
    </template>
  </MasonryWall>
</template>
