<script setup lang="ts">
import { Award } from '~/types'

const props = defineProps<{ award: Award }>()

const { award } = toRefs(props)

const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col">
    <span class="text-light">{{ t(`awards.${award.name}`) }}</span>
    <Date :date="award.date" />
    <a v-if="award.href" :href="award.href" rel="noopener" target="_blank">
      {{ t('details') }}
    </a>
  </div>
</template>
