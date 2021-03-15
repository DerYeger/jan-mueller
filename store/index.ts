import { Breadcrumb } from '~/model/breadcrumbs'

export interface State {
  title: string
  useDarkTheme: boolean
  breadcrumbs: Breadcrumb[]
}

export const state: () => State = () => ({
  title: 'home.title',
  useDarkTheme: true,
  breadcrumbs: [] as Breadcrumb[],
})

export const mutations = {
  setTitle(state: State, title: string) {
    state.title = title
  },
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
