// All services related to number.
import BaseServices from './BaseServices'
import { API } from './API'

class NumberServices extends BaseServices {
    static list= () => {
      return super.httpRequest.get(API.number.list)
    }
}

export default NumberServices
