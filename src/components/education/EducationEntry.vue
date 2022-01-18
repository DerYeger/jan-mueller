<script setup lang="ts">
import { Education } from '~/types'

const props = defineProps<{ education: Education }>()

const { education } = toRefs(props)

const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col lh-6">
    <span class="text-light">{{ t(`education.${education.name}`) }}</span>
    <span class="text-light">
      {{ t(`education.institutions.${education.institution}`) }}
    </span>
    <span class="text-lighter">
      <Date :date="education.startDate" />
      –
      <Date v-if="education.endDate" :date="education.endDate" />
      <span v-else>{{ t('today') }}</span>
    </span>
  </div>
</template>
