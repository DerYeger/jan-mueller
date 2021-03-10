import { mount } from '@vue/test-utils'
import TableOfContents from '@/components/TableOfContents.vue'

describe('TableOfContents', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(TableOfContents, {
      propsData: {
        document: {
          toc: [],
        },
      },
    })
    expect(wrapper.vm).toBeTruthy()
  })
})
