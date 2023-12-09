module.exports = {
  semi: false,
  singleQuote: true,
  plugins: [import('prettier-plugin-astro')],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
}
