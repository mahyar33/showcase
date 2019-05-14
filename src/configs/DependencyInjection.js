import Security from './network/Security'
import { store } from './redux/ConfigureStore'
import { createStructuredSelector } from 'reselect'
import { makeSelectRole, makeSelectSession } from '../redux/user/UserSelectors'
import Gateway from './network/Gateway'
import BaseServices from '../services/BaseServices'
export const runDI = () => {
  store.subscribe(() => {
    const reduxState = createStructuredSelector({
      session: makeSelectSession(),
      role: makeSelectRole()
    })(store.getState())
    Security.injectingParam(reduxState.session, reduxState.role)
  })
  Gateway.security = Security
  BaseServices.httpRequest = Gateway
}
