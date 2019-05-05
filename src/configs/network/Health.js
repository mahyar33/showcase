// Check user connection Status whether it's connected or not
import { NETWORK_CHECKING_DELAY } from '../Base'

require('offline-js')

const health = (callback) => {
  const delay = NETWORK_CHECKING_DELAY
  window.Offline.options = {
    checks: { xhr: { url: 'https://google.com' } }
  }

  window.Offline.on('up', () => {
    callback(null, 'up')
  })
  window.Offline.on('down', () => {
    callback(null, 'down')
  })
  setTimeout(function retry () {
    window.Offline.check()
    setTimeout(retry, delay)
  }, delay)
}
export default health
