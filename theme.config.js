import colors from 'vuetify/es5/util/colors'

export const primaryColor = '#007aff'

export const themes = {
  light: {
    primary: primaryColor,
  },
  dark: {
    primary: primaryColor,
    accent: colors.grey.darken3,
    secondary: colors.amber.darken3,
    info: colors.teal.lighten1,
    warning: colors.amber.base,
    error: colors.deepOrange.accent4,
    success: colors.green.accent3,
  },
}
