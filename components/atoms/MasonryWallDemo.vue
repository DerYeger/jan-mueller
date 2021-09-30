<template>
  <MasonryWall :items="items" :ssr-columns="1" :column-width="300" :gap="16">
    <template #default="{ item }">
      <pre
        class="elevated-card language-"
        :style="{ height: `${item.height}px`, margin: 0 }"
      >
        <span>{{ item.content }}</span>
      </pre>
    </template>
  </MasonryWall>
</template>

<script setup lang="ts">
const items = [
  { content: 'First', height: 150 },
  { content: 'Second', height: 300 },
  { content: 'Third', height: 150 },
  { content: 'Fourth', height: 450 },
]
</script>

<style scoped lang="scss">
.elevated-card {
  align-items: center;
  border-radius: 4px;
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%),
    0 1px 10px 0 rgb(0 0 0 / 12%);
  display: flex;
  justify-content: center;
}

.elevated-card::before {
  display: none;
}
</style>
