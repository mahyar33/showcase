/*
Defining config constants (for example API URL,..)
*/

export const NETWORK_CHECKING_DELAY=5000; // eslint-disable-line
export const BACK_END = `${`${window.location.protocol}` + '//'}${process.env.REACT_APP_BACKEND ? process.env.REACT_APP_BACKEND : 'localhost:8080'}`
export const SOCKET_ADDRESS = process.env.REACT_APP_SOCKET ? process.env.REACT_APP_SOCKET : 'http://localhost:9093'
