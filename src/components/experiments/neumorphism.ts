export {}

document.querySelectorAll<HTMLInputElement>('#neon-bar-toggle').forEach((toggle) => {
  toggle.addEventListener('change', (event) => {
    const target = event.target as HTMLInputElement
    const bar = document.querySelector('.neon-bar') as HTMLElement
    if (target.checked) {
      bar.style.setProperty('--from', '#44bb44')
    } else {
      bar.style.setProperty('--from', 'red')
    }
  })
})
