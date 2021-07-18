import { mount, RouterLinkStub } from '@vue/test-utils'
import Vuetify from 'vuetify'
import LanguageToggle from '~/components/atoms/LanguageToggle.vue'

describe('LanguageToggle', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  test('is a Vue instance', () => {
    const wrapper = mount(LanguageToggle, {
      vuetify,
      mocks: {
        switchLocalePath: (i) => i,
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    })
    expect(wrapper.vm).toBeTruthy()
  })
})
