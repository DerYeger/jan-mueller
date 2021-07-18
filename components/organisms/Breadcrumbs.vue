<template>
  <v-breadcrumbs :items="breadcrumbs" nuxt="true" large class="breadcrumbs">
    <template #divider>
      <v-icon v-text="'mdi-chevron-right'" />
    </template>
    <template #item="{ item }">
      <v-breadcrumbs-item
        :to="item.to"
        :disabled="item.disabled"
        :exact="true"
        class="unselectable"
      >
        <v-icon
          v-if="item.text.startsWith('mdi-')"
          class="text--primary"
          v-text="item.text"
        />
        <template v-else>
          {{ $t(item.text) }}
        </template>
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Breadcrumb } from '~/model/breadcrumbs'

export default defineComponent({
  computed: {
    breadcrumbs() {
      const locale = this.$i18n.locale
      const rawCrumbs = this.$store.state.breadcrumbs
      if (rawCrumbs.length < 2) {
        return []
      }
      return rawCrumbs.map((crumb: Breadcrumb, index: number) => ({
        text: crumb.text,
        to: this.localePath(crumb.to, locale),
        disabled: index >= rawCrumbs.length - 1,
      }))
    },
  },
})
</script>

<style lang="scss">
.breadcrumbs {
  li .v-icon {
    font-size: 1.5rem;
  }

  a {
    font-weight: bold;
  }

  a:not(.v-breadcrumbs__item--disabled) {
    color: unset;
  }
}
</style>
