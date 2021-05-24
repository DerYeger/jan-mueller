import { mount } from '@vue/test-utils'
import TableOfContents from '~/components/blog/TableOfContents.vue'

describe('TableOfContents', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(TableOfContents, {
      propsData: {
        document: {
          toc: [],
        },
      },
      mocks: {
        $t: () => {},
      },
    })
    expect(wrapper.vm).toBeTruthy()
  })
})
