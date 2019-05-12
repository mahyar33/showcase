import Security from './network/Security'
import { store } from './redux/ConfigureStore'
import { createStructuredSelector } from 'reselect'
import { makeSelectSession } from '../redux/user/UserSelectors'
import Gateway from './network/Gateway'
import BaseServices from '../services/BaseServices'
export const runDI = () => {
  store.subscribe(() => {
    Security.session = createStructuredSelector({
      session: makeSelectSession()
    })(store.getState())
  })
  Gateway.security = Security
  BaseServices.httpRequest = Gateway
}