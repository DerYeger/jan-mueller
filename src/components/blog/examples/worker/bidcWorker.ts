import { createChannel } from 'bidc'
import { getPrimeFactors } from './getPrimeFactors'

const { send, receive } = createChannel()

receive((input) => {
  if (typeof input !== 'number' || input <= 0) {
    send('Invalid input')
    return
  }
  const workerResult = getPrimeFactors(input)
  send(workerResult)
})
