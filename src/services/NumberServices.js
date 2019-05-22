import BaseServices from './BaseServices'
import { API } from './API'

class NumberServices extends BaseServices {
    static list= () => {
      return super.httpRequest.get(API.number.list)
    }
}

export default NumberServices
