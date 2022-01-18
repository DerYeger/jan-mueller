<script setup lang="ts">
import { isDark, toggleDark } from '~/composables'

const { t } = useI18n()
</script>

<template>
  <nav class="text-xl my-6 text-center">
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
      to="/documents"
      :title="t('button.documents')"
      active-class="!text-$primary op90"
    >
      <carbon-document />
    </router-link>

    <router-link
      class="icon-btn mx-2"
      to="/about"
      :title="t('button.about')"
      active-class="!text-$primary op90"
    >
      <carbon-dicom-overlay />
    </router-link>

    <button
      class="icon-btn mx-2"
      :title="t('button.toggle_dark')"
      @click="toggleDark()"
    >
      <carbon-moon v-if="isDark" />
      <carbon-sun v-else />
    </button>

    <a
      class="icon-btn mx-2"
      href="https://github.com/DerYeger"
      rel="noopener"
      target="_blank"
      title="GitHub"
    >
      <carbon-logo-github />
    </a>

    <a
      class="icon-btn mx-2"
      href="https://www.xing.com/profile/Jan_Mueller1092/cv"
      rel="noopener"
      target="_blank"
      title="XING"
    >
      <carbon-logo-xing />
    </a>
  </nav>
</template>
