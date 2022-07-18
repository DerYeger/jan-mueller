<script setup lang="ts">
import { useAwards, useSlideIn } from '~/composables'

const awards = useAwards()

const { t } = useI18n()

const container = ref<HTMLElement>()
useSlideIn(container)
</script>

<template>
  <div ref="container" class="flex-center flex-col">
    <h2 class="subheading">{{ t('awards.title') }}</h2>
    <ul class="children:my-2">
      <li v-for="award of awards" :key="award.name">
        <AwardEntry :award="award" />
      </li>
    </ul>
  </div>
</template>
