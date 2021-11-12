module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
    'plugin:vue/base',
    'plugin:vuetify/recommended',
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'vue/multi-word-component-names': 'off',
  },
}
