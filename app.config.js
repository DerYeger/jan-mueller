import colors from 'vuetify/es5/util/colors'

const primaryColor = '#007aff'

export default {
  host:
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:3000'
      : 'https://jan-mueller.at',
  name: 'Jan Müller',
  theme: {
    primaryColor,
    light: {
      primary: primaryColor,
      secondary: colors.green.darken3,
    },
    dark: {
      primary: primaryColor,
      secondary: colors.green.lighten1,
    },
  },
}
