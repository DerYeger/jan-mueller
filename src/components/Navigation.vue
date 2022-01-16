<script setup lang="ts">
import { isDark, toggleDark } from '~/composables'

const { t } = useI18n()
</script>

<template>
  <nav class="text-xl my-6 text-center">
    <router-link class="icon-btn mx-2" to="/" :title="t('button.home')">
      <carbon-home />
    </router-link>

    <router-link class="icon-btn mx-2" to="/blog" :title="t('button.blog')">
      <carbon-blog />
    </router-link>

    <button
      class="icon-btn mx-2"
      :title="t('button.toggle_dark')"
      @click="toggleDark()"
    >
      <carbon-moon v-if="isDark" />
      <carbon-sun v-else />
    </button>

    <router-link class="icon-btn mx-2" to="/about" :title="t('button.about')">
      <carbon-dicom-overlay />
    </router-link>

    <a
      class="icon-btn mx-2"
      href="https://github.com/DerYeger"
      rel="noopener"
      target="_blank"
      title="GitHub"
    >
      <carbon-logo-github />
    </a>
  </nav>
</template>
