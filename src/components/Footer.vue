<script setup lang="ts">
import type { Ref } from 'vue'

import { PageViewsKey } from '~/types'

const { t } = useI18n()

const pageViews = inject<Ref<number>>(PageViewsKey) || 0
</script>

<template>
  <footer
    class="surface border-t-1 pa-4 flex flex-row text-sm gap-8 items-start content-start flex-wrap justify-center children:flex children:flex-col children:gap-1"
  >
    <div>
      <span class="mb-4">About</span>
      <router-link
        to="/about"
        :title="t('button.about')"
        active-class="!text-$primary op90"
      >
        {{ t('button.about') }}
      </router-link>
      <span class="text-lighter">
        2021 - {{ new Date().getFullYear() }} &copy; Jan Müller
      </span>
      <a
        href="https://github.com/DerYeger/jan-mueller"
        rel="noopener"
        target="_blank"
      >
        {{ t('source') }}
      </a>
      <span class="text-lighter">{{ pageViews }} views</span>
    </div>
    <div>
      <span class="mb-4">Contact</span>
      <a
        href="https://github.com/DerYeger"
        rel="noopener"
        target="_blank"
        title="GitHub"
      >
        GitHub
      </a>

      <a
        href="https://www.xing.com/profile/Jan_Mueller1092/cv"
        rel="noopener"
        target="_blank"
        title="XING"
      >
        XING
      </a>

      <a href="mailto:mail@jan-mueller.at" title="XING"> Mail </a>
    </div>
  </footer>
</template>
