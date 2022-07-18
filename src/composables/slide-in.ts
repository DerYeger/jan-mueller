import type { Ref } from 'vue'

export function useSlideIn(target: Ref<HTMLElement | undefined>) {
  watch(target, (value) => value?.classList.add('slide-in'))
  useIntersectionObserver(target, (elements) => {
    elements.forEach((element) => {
      if (element.isIntersecting) {
        element.target.classList.add('slide-in-visible')
      }
    })
  })
}
