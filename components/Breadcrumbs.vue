<template>
  <v-breadcrumbs :items="breadcrumbs" nuxt="true" dark large>
    <template #divider>
      <v-icon>mdi-chevron-right</v-icon>
    </template>
    <template #item="{ item }">
      <v-breadcrumbs-item
        :to="item.to"
        :disabled="item.disabled"
        :exact="true"
        color="primary"
      >
        <v-icon v-if="item.text.startsWith('mdi-')">{{ item.text }}</v-icon>
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
    color: unset;
  }
}
</style>
