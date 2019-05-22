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
