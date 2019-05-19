import BaseServices from './BaseServices'
import { API } from './API'

class CityServices extends BaseServices {
    static list= () => {
      return super.httpRequest.get(API.city.list)
    }
}

export default CityServices
