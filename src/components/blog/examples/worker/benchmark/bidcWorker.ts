import { createChannel } from 'bidc'

const { send, receive } = createChannel()

receive((data) => {
  send(data)
})
