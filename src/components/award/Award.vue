<script setup lang="ts">
import { Award } from '~/types'

const props = defineProps<{ award: Award }>()

const { award } = toRefs(props)

const { d, t } = useI18n()
</script>

<template>
  <span class="text-light">{{ t(`awards.${award.name}`) }}</span> ·
  <span class="text-lighter">{{ d(new Date(award.date), 'month') }}</span>
  <template v-if="award.href">
    ·
    <a :href="award.href" rel="noopener" target="_blank">
      {{ t('details') }}
    </a>
  </template>
</template>
