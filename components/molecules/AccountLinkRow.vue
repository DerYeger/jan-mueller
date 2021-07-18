<template>
  <v-row justify="center">
    <account-link
      v-for="(account, index) of accounts"
      :key="index"
      :name="account.name"
      :icon="account.icon"
      :href="account.href"
      :color="account.color"
    />
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  data() {
    return {
      accounts: [
        {
          name: 'GitHub',
          href: 'https://github.com/DerYeger',
          icon: 'mdi-github',
        },
        {
          name: 'XING',
          href: 'https://www.xing.com/profile/Jan_Mueller1092/cv',
          icon: 'mdi-xing',
        },
      ],
    }
  },
})
</script>
