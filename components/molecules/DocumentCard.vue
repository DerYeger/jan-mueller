<template>
  <v-hover v-slot="{ hover }">
    <v-card
      :elevation="hover ? 6 : 2"
      :class="hover ? 'primary--text' : 'text'"
    >
      <v-card-title style="word-break: keep-all">
        {{ $t(`documents.files.${document.file}`) }}
      </v-card-title>
      <v-card-subtitle>
        <i>
          {{ $d(document.date, 'short') }} ·
          {{ $t(`misc.${document.language}`) }}
        </i>
      </v-card-subtitle>
      <v-divider class="mx-4" />
      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          color="secondary"
          :href="`/documents/${document.file}.pdf`"
          target="_blank"
          download
        >
          {{ $t('actions.download') }}
        </v-btn>
        <v-btn
          text
          color="primary"
          :to="localePath(`/documents/${document.file}`)"
        >
          {{ $t('actions.view') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    document: {
      type: Object as PropType<Document>,
      required: true,
    },
  },
})
</script>
