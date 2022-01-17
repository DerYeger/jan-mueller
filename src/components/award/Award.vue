<script setup lang="ts">
import { Award } from '~/types'

const props = defineProps<{ award: Award }>()

const { award } = toRefs(props)

const { t } = useI18n()
</script>

<template>
  <span class="text-light">{{ t(`awards.${award.name}`) }}</span> ·
  <Date :date="award.date" />
  <template v-if="award.href">
    ·
    <a :href="award.href" rel="noopener" target="_blank">
      {{ t('details') }}
    </a>
  </template>
</template>
