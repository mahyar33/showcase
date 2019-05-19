// `HttpRequest` is using an instance of `axios` for customisation such as
// credentials, content type and adding the default base url to all calls.
// Also it intercepts all calls for error handling and authentication, authorisation fallbacks
import axios from 'axios'
import Security from './Security'
import { BACK_END } from '../Base'

const instance = axios.create({
  baseURL: BACK_END,
  withCredentials: true
})
// You can add your default headers here
instance.defaults.headers['Content-Type'] = undefined

// All requests are having *config* as an optional parameter which is `axios` [requests configs](https://github.com/axios/axios#request-config).
class Gateway {
  static #security;
  static set security (security) {
    this.#security = security
  }
  static post (url, params = {}, session = false, config = null) {
    return this.execute(url, { data: params }, config, 'post', session)
  }
  static put (url, params = {}, session = false, config = null) {
    return this.execute(url, { data: params }, config, 'put', session)
  }
  static patch (url, params = {}, session = false, config = null) {
    return this.execute(url, { data: params }, config, 'patch', session)
  }

  static head (url, params = {}, session = false, config = null) {
    return this.execute(url, { data: params }, config, 'head', session)
  }

  static delete (url, params = {}, session = false, config = null) {
    return this.execute(url, { data: params }, config, 'delete', session)
  }

  static get (url, params = {}, session = false, config = null) {
    return this.execute(url, { params }, config, 'get', session)
  }
  static postFile (url, formData, session = false, config = null) {
    const reConfig = Object.assign({}, config, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    return this.execute(url, { data: formData }, reConfig, 'post', session)
  }
  static execute = (url, params = {}, config = null, method = 'get', session = false) => {
    if (session) {
      params = Object.assign({}, params, {
        session: this.#security.session ? this.#security.session : ''
      })
    }
    return instance(url, {
      ...config,
      ...params,
      method
    })
      .then((payload) => {
        return this.statusChecking(payload)
      })
      .catch((error) => {
        return this.errorHandling(error)
      })
  }
    // Push other status into error handling
    static statusChecking = (payload) => {
      if (payload.status !== 200) return Promise.reject(payload.status)
      return Promise.resolve(payload)
    }

    static errorHandling = (error) => {
      if (error.response) {
        if (error.response.status === 401) {
          return Security.logout().then(() => Promise.reject(error.response))
        } if (error.response.status === 500) return Promise.reject(new Error('Server Error!'))
        if (error.response.status === 404) {
          return Promise.reject(
            new Error(error.response.data.error_message)
          )
        }
        return Promise.reject(error.response)
      } if (error) {
        if (error === 401) {
          return Security.logout().then(() => Promise.reject(error))
        }
        return Promise.reject(error)
      }
      return Promise.reject(new Error(400))
    }
}

export default Gateway
