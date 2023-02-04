const amount = 5

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min
}

type Direction = [number, number]

function randomDirection(): Direction {
  return [randomInRange(-5, 5), randomInRange(-5, 5)]
}

function letThemLoose(container: HTMLElement) {
  // create a canvas, add it to the dom and set its width and height to the window width and height
  const canvas = document.createElement('canvas')
  canvas.width = container.getBoundingClientRect().width
  canvas.height = container.getBoundingClientRect().height
  // make the canvas fill the whole screen and absolutely positioned
  canvas.style.position = 'absolute'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.zIndex = '1'
  container.appendChild(canvas)
  new ResizeObserver(() => {
    canvas.style.width = `${container.getBoundingClientRect().width}`
    canvas.style.height = `${container.getBoundingClientRect().height}`
  }).observe(container)

  const ants = Array.from({ length: amount }, (_, index) => {
    return {
      x: randomInRange(0, canvas.width),
      y: canvas.height,
      direction: randomDirection(),
      id: index,
    }
  })

  ants.forEach(({ x, y, direction }) => {
    // draw a black dot at the location given by x and y on the canvas
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return
    }

    const _interval = window.setInterval(() => {
      // direction is a tuple of two numbers, the first one is the x direction and the second one is the y direction. add a black dot relative to the coordinates x and y to the canvas
      const [xDirection, yDirection] = direction
      // draw a line from the previous coordinates to the new coordinates
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x + xDirection, y + yDirection)
      ctx.strokeStyle = '#a08679'
      ctx.lineWidth = 2
      ctx.stroke()

      // with a 10% chance, change the direction
      if (Math.random() < 0.5) {
        direction = randomDirection()
      }

      const { width, height } = container.getBoundingClientRect()

      // if the x coordinate is bigger than the window width or smaller than 0, change the x direction
      if (x + xDirection > width || x + xDirection < 0) {
        direction[0] = -xDirection
      }
      // if the y coordinate is bigger than the window height or smaller than 0, change the y direction
      if (y + yDirection > height || y + yDirection < 0) {
        direction[1] = -yDirection
        // window.clearInterval(interval)
      }
      // set the new coordinates
      x += xDirection
      y += yDirection
    }, 100)
  })
}

document
  .querySelectorAll<HTMLButtonElement>('button.ant-trigger')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const container = button.parentElement
      if (!container) {
        return
      }
      container.removeChild(button)
      letThemLoose(container)
    })
  })
