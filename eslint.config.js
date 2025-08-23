import yeger from '@yeger/eslint-config'

export default yeger(
  {
    ignores: ['public/**/*'],
  },
  {
    rules: {
      'antfu/no-top-level-await': 'off',
    },
  },
)
