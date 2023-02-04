import { Vector } from 'vecti'

const neonBars = document.querySelectorAll<HTMLElement>('.neon-bar')
neonBars.forEach((neonBar) => {
  let percentage = 0
  neonBar.addEventListener('pointermove', (e) => {
    stopRotate()
    const event = e as PointerEvent
    const { width, height } = neonBar.getBoundingClientRect()
    const center = new Vector(width / 2, height / 2)
    const vector = new Vector(event.offsetX, event.offsetY)
    percentage = vector.subtract(center).length() / center.length()
    updateAngle()
  })
  let timeout: number | undefined
  neonBar.addEventListener('pointerleave', () => {
    startRotate()
  })
  neonBar.addEventListener('pointerover', () => {
    stopRotate()
  })
  startRotate()

  function startRotate() {
    stopRotate()
    timeout = window.setTimeout(() => {
      percentage -= (3 * percentage + 0.001) * 0.01
      updateAngle()
      startRotate()
    }, 10)
  }

  function stopRotate() {
    window.clearTimeout(timeout)
  }

  function updateAngle() {
    if (percentage > 1) {
      percentage = 0
    }
    if (percentage < 0) {
      percentage = 1
    }
    neonBar.style.setProperty('--angle', `${90 - percentage * 360}deg`)
  }
})
