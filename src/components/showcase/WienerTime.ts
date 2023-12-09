export {}

function setUpListeners() {
  ;[...document.getElementsByClassName('wl-lines')].forEach((grid) => {
    const lines = [...grid.getElementsByTagName('path')]
    const initialDashoffset = calculateDashoffset(grid)
    lines.forEach((line) => {
      const length = line.getTotalLength()
      line.style.strokeDasharray = `${length}px`
      setDashoffset(line, initialDashoffset)
    })
    window.addEventListener(
      'scroll',
      function onScroll() {
        const percentage = calculateDashoffset(grid)
        lines.forEach((line) => {
          setDashoffset(line, percentage)
        })
        // if (percentage >= 1) {
        //   window.removeEventListener('scroll', onScroll)
        // }
      },
      { passive: true },
    )
  })
}

function calculateDashoffset(grid: Element): number {
  const clientHeight = document.documentElement.clientHeight
  const scrollPos = document.documentElement.scrollTop
  const { top, height } = grid.getBoundingClientRect()
  const marginStart = 0.3 * clientHeight
  const marginEnd = height
  const gridPos = top + scrollPos

  const start = gridPos - 0.5 * clientHeight - marginStart
  if (scrollPos < start) {
    return 0
  }

  const end = start + clientHeight - marginStart - marginEnd
  if (scrollPos > end) {
    return 1
  }

  const reached = scrollPos - start
  const scrollHeight = end - start
  const percentage = reached / scrollHeight
  return percentage
}

function setDashoffset(line: SVGPathElement, percentage: number) {
  const length = line.getTotalLength()
  if (percentage === 0) {
    line.style.opacity = '0'
  } else {
    line.style.opacity = Math.min(1, 1.5 * percentage).toFixed(2)
  }
  line.style.strokeDashoffset = `${length - length * percentage}px`
}

// window.onload = setUpListeners
setUpListeners()
