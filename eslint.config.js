import yeger from '@yeger/eslint-config'

export default yeger(
  {
    ignores: ['public/**/*'],
  },
  {
    rules: {
      'cypress/no-async-tests': 'off',
    },
  },
)
