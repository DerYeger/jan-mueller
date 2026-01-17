import type { PrimeFactorsResult } from '~/components/blog/examples/worker/getPrimeFactors'

export function setupFactorizer(id: string) {
  const input = document.getElementById(`${id}-input`) as HTMLInputElement | null
  const button = document.getElementById(`${id}-button`) as HTMLButtonElement | null
  const result = document.getElementById(`${id}-result`) as HTMLDivElement | null
  const exampleButtons = document.querySelectorAll(
    `button[data-target="${id}"]`,
  ) as NodeListOf<HTMLButtonElement>

  if (!input || !button || !result) {
    throw new Error('One or more elements not found')
  }

  function disableInputs() {
    input!.disabled = true
    button!.disabled = true
    exampleButtons.forEach((btn) => {
      btn.disabled = true
    })
  }

  function enableInputs() {
    input!.disabled = false
    button!.disabled = false
    exampleButtons.forEach((btn) => {
      btn.disabled = false
    })
  }

  let loadingIndicatorTimeout: ReturnType<typeof setTimeout> | null = null

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      button.click()
    }
  })

  function addClickHandler(callback: (input: number) => void) {
    button!.addEventListener('click', () => {
      if (button?.disabled) {
        return
      }
      const inputValue = parseInt(input!.value, 10)
      if (isNaN(inputValue) || inputValue <= 0) {
        result!.textContent = 'Please enter a valid positive integer.'
        return
      }
      disableInputs()
      updateLoadingIndicator()
      callback(inputValue)
    })
  }

  function updateLoadingIndicator(step: number = 0) {
    if (loadingIndicatorTimeout) {
      clearTimeout(loadingIndicatorTimeout)
    }
    loadingIndicatorTimeout = setTimeout(() => {
      result!.textContent = '.'.repeat((step % 3) + 1)
      updateLoadingIndicator(step + 1)
    }, 300)
  }

  function onResult({ factors, time }: PrimeFactorsResult) {
    if (loadingIndicatorTimeout) {
      clearTimeout(loadingIndicatorTimeout)
    }
    result!.textContent = `${factors.join(', ')} (took ${time.toFixed(0)} ms)`
    enableInputs()
  }

  return {
    input,
    button,
    result,
    addClickHandler,
    onResult,
  }
}
