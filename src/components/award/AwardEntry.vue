<script setup lang="ts">
import { Award } from '~/types'

const props = defineProps<{ award: Award }>()

const { award } = toRefs(props)

const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col lh-6">
    <span class="text-light">{{ t(`awards.${award.name}`) }}</span>
    <span>
      <Date class="text-lighter" :date="award.date" />
      <template v-if="award.href">
        <Dot class="text-lighter" />
        <a :href="award.href" rel="noopener" target="_blank">
          {{ t('details') }}
        </a>
      </template>
    </span>
  </div>
</template>
