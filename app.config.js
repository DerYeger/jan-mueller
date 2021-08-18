import colors from 'vuetify/es5/util/colors'

const primaryColor = '#007aff'

export default {
  host: 'https://jan-mueller.at',
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
