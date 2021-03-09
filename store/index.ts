export interface State {
  title: string
}

export const state: () => State = () => ({
  title: 'Home',
})

export const mutations = {
  setTitle(state: State, title: string) {
    state.title = title
  },
}
