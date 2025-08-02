import { getPrimeFactors } from './getPrimeFactors'

onmessage = (e) => {
  const input = e.data
  if (typeof input !== 'number' || input <= 0) {
    postMessage({ error: 'Invalid input' })
    return
  }
  const workerResult = getPrimeFactors(input)
  postMessage(workerResult)
}
