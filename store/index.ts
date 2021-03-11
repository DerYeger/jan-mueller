export interface State {
  title: string
}

export const state: () => State = () => ({
  title: 'home.title',
})

export const mutations = {
  setTitle(state: State, title: string) {
    state.title = title
  },
}
