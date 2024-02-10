const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,svg,ts,tsx,vue}',
    './plugins/**/*.ts',
    'astro.config.mjs',
  ],
  theme: {
    extend: {
      colors: {
        light: {
          DEFAULT: colors.neutral['700'],
        },
        lighter: {
          DEFAULT: colors.neutral['600'],
        },
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('children', '& > *')
    },
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'animation-delay': (value) => {
            return {
              'animation-delay': value,
            }
          },
        },
        {
          values: theme('transitionDelay'),
        },
      )
    },
    require('@tailwindcss/typography'),
  ],
}
