import EVENT from './Event'
import BaseSocket from './BaseSocket'

export default class FemaleSocket extends BaseSocket {
    static onFemaleLoadSocket = (callback) => {
      super.socket.on(EVENT.female.load, callback)
    }
    static backgroundEvents=() => {
      return { events: [this.onFemaleLoadSocket], api: [ { type: 'female', payload: '' } ] }
    }
}
