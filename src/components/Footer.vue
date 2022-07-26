<script setup lang="ts">
import type { Ref } from 'vue'

import { PageViewsKey } from '~/types'

const { t } = useI18n()

const pageViews = inject<Ref<number>>(PageViewsKey) || 0
</script>

<template>
  <footer class="pa-4 text-center text-sm">
    <!-- prettier-ignore   -->
    <span class="text-lighter">2021 - {{ new Date().getFullYear() }} &copy; Jan Müller</span>
    <Dot class="text-lighter" />
    <a
      href="https://github.com/DerYeger/jan-mueller"
      rel="noopener"
      target="_blank"
    >
      {{ t('source') }}
    </a>
    <Dot class="text-lighter" />
    <router-link
      to="/about"
      :title="t('button.about')"
      active-class="!text-$primary op90"
    >
      {{ t('button.about') }}
    </router-link>
    <Dot class="text-lighter" />
    <span class="text-lighter">{{ pageViews }} views</span>
  </footer>
</template>
