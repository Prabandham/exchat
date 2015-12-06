import ExSocket from '../constants/ExSocket'
import { RT_EVENT } from '../constants/ApiTypes'

export default store => next => action => {
  const rtEvent = action[RT_EVENT]
  if (typeof rtEvent === 'undefined') {
    return next(action)
  }

  let {channelId, event} = rtEvent
  let text = action.text

  if (!channelId) {
    throw new Error('No channel!')
  }
  if (!event) {
    throw new Error('No event!')
  }
  if (!text) {
    throw new Error('No sending body!')
  }

  let foundChannel = ExSocket.findChannel(channelId)
  foundChannel.push(event, {text: text})
    .receive('ok', (msg) => console.log('posted message', msg))

  return next(action)
}
