import { mount, RouterLinkStub } from '@vue/test-utils'
import LanguageToggle from '@/components/LanguageToggle.vue'

describe('LanguageToggle', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(LanguageToggle, {
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
