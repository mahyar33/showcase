// All services related to male.
import BaseServices from './BaseServices'
import { API } from './API'

class MaleServices extends BaseServices {
    static list= () => {
      return super.httpRequest.get(API.male.list)
    }
}

export default MaleServices
