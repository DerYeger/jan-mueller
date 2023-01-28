module.exports = {
  semi: false,
  singleQuote: true,
  plugins: [require('prettier-plugin-astro')],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
}
