import { mount, RouterLinkStub } from '@vue/test-utils'
import LanguageToggle from '@/components/LanguageToggle.vue'
import Vuetify from 'vuetify'

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
