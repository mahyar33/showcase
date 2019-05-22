import EVENT from './Event'
import BaseSocket from './BaseSocket'
import { CITY_LIST } from '../redux/city/CityConstants'
export default class CitySocket extends BaseSocket {
   static onCityLoadSocket = (callback) => {
     super.socket.on(EVENT.city.load, callback)
   }
   static backgroundEvents=() => {
     return { events: [this.onCityLoadSocket], api: [ { type: CITY_LIST, payload: '' } ] }
   }
}
