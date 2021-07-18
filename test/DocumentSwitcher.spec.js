import { mount } from '@vue/test-utils'
import DocumentSwitcher from '~/components/atoms/DocumentSwitcher.vue'

describe('DocumentSwitcher', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(DocumentSwitcher)
    expect(wrapper.vm).toBeTruthy()
  })
})
