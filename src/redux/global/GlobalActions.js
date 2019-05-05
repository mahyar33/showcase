import { networkStatus } from './constants'

export function setNetworkStatus(payload) {// eslint-disable-line
  return {
    type: networkStatus,
    payload
  }
}
