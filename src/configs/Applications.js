// Holds system wide constants such as default url or debug level and ….

export const NETWORK_CHECKING_DELAY = 5000
export const BACK_END = `${`${window.location.protocol}//`}${process.env.REACT_APP_BACKEND ? process.env.REACT_APP_BACKEND : 'localhost:3333'}`
export const SOCKET_ADDRESS = process.env.REACT_APP_SOCKET ? process.env.REACT_APP_SOCKET : 'http://localhost:3333'
export const ROLE = { user: 'USER', admin: 'ADMIN' }
export const NETWORK_STATUS = { online: 'online', offline: 'offline' }
export const NETWORK_CHECK_URL = 'http://localhost:3333/number'
export const PERSISTENT_STORE = ['language', 'user']
