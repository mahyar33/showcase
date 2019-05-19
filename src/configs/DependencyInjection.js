import Security from './network/Security'
import { store } from './redux/ConfigureStore'
import { createStructuredSelector } from 'reselect'
import { makeSelectRole, makeSelectSession } from '../redux/user/UserSelectors'
import Gateway from './network/Gateway'
import BaseServices from '../services/BaseServices'
import io from 'socket.io-client'
import { SOCKET_ADDRESS } from '../configs/Base'
import BaseSocket from '../socket/BaseSocket'
import { logoutAction } from '../redux/user/UserActions'
import Health from './network/Health'
import { setNetworkStatusAction } from '../redux/global/GlobalActions'

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
  BaseSocket.socket = io(SOCKET_ADDRESS)
  Health.setNetworkStatus = reduxDispatch.setNetworkStatus
}
