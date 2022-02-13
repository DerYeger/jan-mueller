<script setup lang="ts">
import type { Project } from '~/types'

const props = defineProps<{ project: Project }>()

const { project } = toRefs(props)

const href = computed(() => `https://github.com/DerYeger/${project.value.repo}`)
</script>

<template>
  <a :href="href" rel="noopener" target="_blank">
    <img
      class="square max-w-16"
      :src="project.img"
      :alt="project.title"
      :title="project.title"
    />
  </a>
</template>
