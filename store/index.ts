import { Breadcrumb } from '~/model/breadcrumbs'

export interface State {
  useDarkTheme: boolean
  breadcrumbs: Breadcrumb[]
}

export const state: () => State = () => ({
  useDarkTheme: true,
  breadcrumbs: [] as Breadcrumb[],
})

export const mutations = {
  setBreadcrumbs(state: State, breadcrumbs: Breadcrumb[]) {
    state.breadcrumbs = breadcrumbs
  },
  loadTheme(state: State) {
    if (process.browser) {
      const storedPreference = localStorage.getItem('useDarkTheme')
      if (storedPreference === null) {
        localStorage.setItem('useDarkTheme', String(state.useDarkTheme))
      }
      state.useDarkTheme = storedPreference !== String(false)
    }
  },
  toggleTheme(state: State) {
    state.useDarkTheme = !state.useDarkTheme
    if (process.browser) {
      localStorage.setItem('useDarkTheme', String(state.useDarkTheme))
    }
  },
}
