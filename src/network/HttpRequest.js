// `HttpRequest` is using an instance of `axios` for customisation such as
// credentials, content type and adding the default base url to all calls.
// Also it intercepts all calls for error handling and authentication, authorisation fallbacks
import axios from 'axios';
import Security from '../utils/Security';

export const backEnd = `${`${window.location.protocol}` + '//'}${process.env.REACT_APP_BACKEND}`;
const instance = axios.create({
  baseURL: backEnd,
  withCredentials: true,
});
// You can add your default headers here
instance.defaults.headers['Content-Type'] = undefined;


// All requests are having *config* as an optional parameter which is `axios` [requests configs](https://github.com/axios/axios#request-config).
class HttpRequest {
  static post(url, params = {}, config = null) {
    return instance.post(url, params, config)
      .then((payload) => {
        HttpRequest.statusChecking(payload);
      })
      .catch((error) => {
        HttpRequest.errorHandling(error);
      });
  }

  static put(url, params = {}, config = null) {
    return instance.put(url, params, config)
      .then((payload) => {
        HttpRequest.statusChecking(payload);
      })
      .catch((error) => {
        HttpRequest.errorHandling(error);
      });
  }

  static patch(url, params = {}, config = null) {
    return instance.patch(url, params, config)
      .then((payload) => {
        HttpRequest.statusChecking(payload);
      })
      .catch((error) => {
        HttpRequest.errorHandling(error);
      });
  }

  static head(url, params = {}, config = null) {
    return instance.head(url, params, config)
      .then((payload) => {
        HttpRequest.statusChecking(payload);
      })
      .catch((error) => {
        HttpRequest.errorHandling(error);
      });
  }

  static delete(url, params = {}, config = null) {
    return instance.delete(url, params, config)
      .then((payload) => {
        HttpRequest.statusChecking(payload);
      })
      .catch((error) => {
        HttpRequest.errorHandling(error);
      });
  }

  static get(url, urlParams = {}, config = null) {
    const reConfig = Object.assign({}, config, {
      params: urlParams,
    });
    return instance.get(url, reConfig)
      .then((payload) => {
        HttpRequest.statusChecking(payload);
      })
      .catch((error) => {
        HttpRequest.errorHandling(error);
      });
  }

  static postFile(url, formData, config = null) {
    const reConfig = Object.assign({}, config, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    return instance.post(url, formData, reConfig)
      .then((payload) => {
        HttpRequest.statusChecking(payload);
      })
      .catch((error) => {
        HttpRequest.errorHandling(error);
      });
  }

    // Push other status into error handling
    static statusChecking = (payload) => {
      if (payload.status !== 200) return Promise.reject(payload.status);
      return Promise.resolve(payload);
    }

    static errorHandling = (error) => {
      if (error.response) {
        if (error.response.status === 401) {
          return Security.signout().then(() => Promise.reject(error.response));
        } if (error.response.status === 500) return Promise.reject(new Error({ data: { error_message: 'Server Error!' } }));
        if (error.response.status === 404) {
          return Promise.reject(
            new Error({ data: { error_message: error.response.data.error_message } }),
          );
        }
        return Promise.reject(error.response);
      } if (error) {
        if (error === 401) {
          return Security.signout().then(() => Promise.reject(error));
        }
        return Promise.reject(error);
      }
      return Promise.reject(new Error(400));
    }
}

export default HttpRequest;
