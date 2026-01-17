export {}

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min
}

type Direction = [number, number]

const maxAntCount = 6
let activeAntCount = 0

function randomDirection(): Direction {
  return [randomInRange(-5, 5), randomInRange(-10, 0) + 3]
}

const antButtons = document.querySelectorAll<HTMLButtonElement>('button.ant-trigger')

function letThemLoose(container: HTMLElement) {
  if (activeAntCount >= maxAntCount) {
    return
  }
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

  const ant = {
    x: randomInRange(0, canvas.width),
    y: canvas.height,
    direction: randomDirection(),
  }

  // draw a black dot at the location given by x and y on the canvas
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return
  }

  activeAntCount++
  if (activeAntCount >= maxAntCount) {
    antButtons.forEach((button) => {
      button.disabled = true
    })
    return
  }
  const interval = window.setInterval(() => {
    // direction is a tuple of two numbers, the first one is the x direction and the second one is the y direction. add a black dot relative to the coordinates x and y to the canvas
    const [xDirection, yDirection] = ant.direction
    // draw a line from the previous coordinates to the new coordinates
    ctx.beginPath()
    ctx.moveTo(ant.x, ant.y)
    ctx.lineTo(ant.x + xDirection, ant.y + yDirection)
    ctx.strokeStyle = '#29211d'
    ctx.lineWidth = 2
    ctx.stroke()

    // with a 10% chance, change the direction
    if (Math.random() < 0.5) {
      ant.direction = randomDirection()
    }

    const { width, height } = container.getBoundingClientRect()

    // if the x coordinate is bigger than the window width or smaller than 0, change the x direction
    if (ant.x + xDirection > width || ant.x + xDirection < 0) {
      ant.direction[0] = -xDirection
    }
    if (ant.y + yDirection <= 0) {
      window.clearInterval(interval)
      activeAntCount--
      antButtons.forEach((button) => {
        button.disabled = false
      })
      return
    }
    // if the y coordinate is bigger than the window height or smaller than 0, change the y direction
    if (ant.y + yDirection > height) {
      ant.direction[1] = -yDirection
    }
    // set the new coordinates
    ant.x += xDirection
    ant.y += yDirection
  }, 100)
}

antButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const container = document.querySelector<HTMLElement>('.ant-container')
    if (!container) {
      return
    }
    letThemLoose(container)
  })
})
