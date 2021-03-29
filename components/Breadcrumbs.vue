<template>
  <v-breadcrumbs :items="breadcrumbs" nuxt="true" large>
    <template #divider>
      <v-icon v-text="'mdi-chevron-right'" />
    </template>
    <template #item="{ item }">
      <v-breadcrumbs-item :to="item.to" :disabled="item.disabled" :exact="true">
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

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  computed: {
    breadcrumbs() {
      const locale = this.$i18n.locale
      const rawCrumbs = this.$store.state.breadcrumbs
      if (rawCrumbs.length < 2) {
        return []
      }
      return rawCrumbs.map((crumb, index) => ({
        text: crumb.text,
        to: this.localePath(crumb.to, locale),
        disabled: index >= rawCrumbs.length - 1,
      }))
    },
  },
})
</script>

<style lang="scss">
.v-breadcrumbs--large,
.v-breadcrumbs {
  li .v-icon {
    font-size: 24px;
  }

  a {
    font-weight: bold;
  }

  a:not(.v-breadcrumbs__item--disabled) {
    color: unset;
  }
}
</style>
