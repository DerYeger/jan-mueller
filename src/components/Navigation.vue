<script setup lang="ts">
import { isDark, toggleDark } from '~/composables'

const { t, availableLocales, locale } = useI18n()

const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script>

<template>
  <nav class="text-xl mt-6 text-center">
    <router-link class="btn mx-2" to="/" :title="t('button.home')">
      <carbon-campsite />
    </router-link>

    <button
      class="btn mx-2"
      :title="t('button.toggle_dark')"
      @click="toggleDark()"
    >
      <carbon-moon v-if="isDark" />
      <carbon-sun v-else />
    </button>

    <a
      class="btn mx-2"
      :title="t('button.toggle_langs')"
      @click="toggleLocales"
    >
      <carbon-language />
    </a>

    <router-link class="btn mx-2" to="/about" :title="t('button.about')">
      <carbon-dicom-overlay />
    </router-link>

    <router-link class="btn mx-2" to="/blog" :title="t('button.blog')">
      <carbon-blog />
    </router-link>

    <a
      class="btn mx-2"
      rel="noreferrer"
      href="https://github.com/DerYeger"
      target="_blank"
      title="GitHub"
    >
      <carbon-logo-github />
    </a>
  </nav>
</template>
