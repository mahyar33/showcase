// injects dependencies into pure js functions.
// `reduxDispatch` is used to inject actions into functions.<br />
// `reduxState` is used to inject redux stores into functions. when redux is updated, all injected stores will be updated. <br />

import Security from './network/Security'
import { store } from './redux/Store'
import { createStructuredSelector } from 'reselect'
import { makeSelectRole, makeSelectSession } from '../redux/user/UserSelectors'
import Gateway from './network/Gateway'
import BaseServices from '../services/BaseServices'
import BaseSocket from '../socket/BaseSocket'
import { logoutAction } from '../redux/user/UserActions'
import Health from './network/Health'
import { setNetworkStatusAction } from '../redux/global/GlobalActions'
import socket from './network/SocketConnection'

export const runDI = () => {
  const reduxDispatch = {
    logout: () => (
      store.dispatch(logoutAction())
    ),
    setNetworkStatus: (payload) => (
      store.dispatch(setNetworkStatusAction(payload))
    )
  }
  store.subscribe(() => {
    const reduxState = createStructuredSelector({
      session: makeSelectSession(),
      role: makeSelectRole()
    })(store.getState())
    Security.injectingParam(reduxState.session, reduxState.role, reduxDispatch.logout)
  })
  Gateway.security = Security
  BaseServices.httpRequest = Gateway
  BaseSocket.socket = socket
  Health.setNetworkStatus = reduxDispatch.setNetworkStatus
}
