import colors from 'vuetify/es5/util/colors'

const primaryColor = '#007aff'

export const themes = {
  dark: {
    primary: primaryColor,
    accent: colors.grey.darken3,
    secondary: colors.amber.darken3,
    info: colors.teal.lighten1,
    warning: colors.amber.base,
    error: colors.deepOrange.accent4,
    success: colors.green.accent3,
  },
  light: {
    primary: primaryColor,
  },
}
