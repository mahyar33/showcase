// Uses to implements common behaviors in all services file.<br />
// `#httpRequest` is a private variable injected by [DependencyInjection](../configs/DependencyInjection.html).<br />
// All services are wrapper for [Gateway](../configs/network/Gateway.html) and also they organize and modify return values.
class BaseServices {
    static #httpRequest
    static set httpRequest (httpRequest) {
      this.#httpRequest = httpRequest
    }
    static get httpRequest () {
      return this.#httpRequest
    }
}
export default BaseServices
