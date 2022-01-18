<script setup lang="ts">
import { useAge } from '~/composables'

const age = useAge()

const { t } = useI18n()
</script>

<template>
  <p class="prose text-lighter">
    <samp>{{ t('about.facts', { age }) }}</samp>
  </p>
</template>
