import type { Ref } from 'vue'

type SlideTypes =
  | 'slide-in-from-left'
  | 'slide-in-from-right'
  | 'slide-in-from-below'

export function useSlideIn(
  target: Ref<HTMLElement | undefined>,
  type: SlideTypes = 'slide-in-from-below'
) {
  watch(target, (value) => value?.classList.add(...['slide-in', type]))
  useIntersectionObserver(target, (elements) => {
    elements.forEach((element) => {
      if (element.isIntersecting) {
        element.target.classList.add('slide-in-visible')
      }
    })
  })
}
