// All services related to global events.
import BaseServices from './BaseServices'
import { API } from './API'

class GlobalServices extends BaseServices {
     static checkVersion= () => {
       return super.httpRequest.post(API.global.checkVersion)
     }
}

export default GlobalServices
