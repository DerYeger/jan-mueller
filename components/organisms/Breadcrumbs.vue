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
        :aria-label="$t(item.text)"
        class="unselectable breadcrumb-item"
      >
        <v-icon
          v-if="item.icon"
          class="text--primary"
          :aria-label="$t(item.text)"
          v-text="item.icon"
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
        icon: crumb.icon,
        disabled: index >= rawCrumbs.length - 1,
      }))
    },
  },
})
</script>

<style lang="scss">
.breadcrumbs {
  flex-wrap: nowrap;

  li .v-icon {
    font-size: 1.5rem;
  }

  a {
    font-weight: bold;
  }

  a:not(.v-breadcrumbs__item--disabled) {
    color: unset;
  }

  .breadcrumb-item {
    white-space: nowrap;
  }
}
</style>
