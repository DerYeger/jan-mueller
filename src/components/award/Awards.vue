<script setup lang="ts">
import { useAwards } from '~/composables'

const awards = useAwards()

const { t } = useI18n()
</script>

<template>
  <div class="flex-center flex-col">
    <h2 class="subheading">{{ t('awards.title') }}</h2>
    <ul>
      <li v-for="award of awards" :key="award.name">
        <AwardEntry :award="award" />
      </li>
    </ul>
  </div>
</template>
