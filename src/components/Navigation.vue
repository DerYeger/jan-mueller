<script setup lang="ts">
import { isDark, toggleDark } from '~/composables'

const { t } = useI18n()
</script>

<template>
  <nav class="text-xl text-center">
    <router-link
      class="icon-btn mx-2"
      to="/"
      :title="t('button.home')"
      active-class="!text-$primary op90"
    >
      <carbon-home />
    </router-link>

    <router-link
      class="icon-btn mx-2"
      to="/blog"
      :title="t('button.blog')"
      active-class="!text-$primary op90"
    >
      <carbon-blog />
    </router-link>

    <router-link
      class="icon-btn mx-2"
      to="/files"
      :title="t('button.files')"
      active-class="!text-$primary op90"
    >
      <carbon-document />
    </router-link>

    <button
      class="icon-btn mx-2"
      :title="t('button.toggle_dark')"
      @click="toggleDark()"
    >
      <carbon-moon v-if="isDark" />
      <carbon-sun v-else />
    </button>
  </nav>
</template>
