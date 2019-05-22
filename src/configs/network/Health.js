// Check user connection Status whether it's connected or not
import { NETWORK_CHECKING_DELAY, NETWORK_STATUS } from '../Applications'

require('offline-js')

class health {
  static #setNetworkStatus
  static set setNetworkStatus (setNetworkStatus) {
    this.#setNetworkStatus = setNetworkStatus
  }
  static runHealthCheck=() => {
    const delay = NETWORK_CHECKING_DELAY
    window.Offline.options = {
      checkOnLoad: true,
      checks: { xhr: { url: 'http://localhost:3333/number' } }
    }

    window.Offline.on('up', () => {
      console.log('up')
      this.#setNetworkStatus(NETWORK_STATUS.online)
    })
    window.Offline.on('down', () => {
      console.log('down')
      this.#setNetworkStatus(NETWORK_STATUS.offline)
    })
    setTimeout(function retry () {
      window.Offline.check()
      setTimeout(retry, delay)
    }, delay)
  }
}
export default health
