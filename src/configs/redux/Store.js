/*
    Create the store with two middlewares
     1. sagaMiddleware: Makes redux-sagas work
     2. routerMiddleware: Syncs the location/URL path to the state
    and If Redux DevTools Extension is installed use it, otherwise use Redux compose
*/

import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router/immutable'
import createSagaMiddleware from 'redux-saga'
import { persistStore } from 'redux-persist'
import CreateReducer from './Reducers'
import Reactotron from '../Reactotron'
import history from '../routing/History'

const sagaMonitor = Reactotron.createSagaMonitor()
const sagaMiddleware = createSagaMiddleware({ sagaMonitor })
const initialState = {}
const middlewares = [sagaMiddleware, routerMiddleware(history)]

const enhancers = [applyMiddleware(...middlewares), Reactotron.createEnhancer()]

/* eslint-disable no-underscore-dangle, indent */
  const composeEnhancers = process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose
  /* eslint-enable */

const store = createStore(
  CreateReducer(),
  initialState,
  composeEnhancers(...enhancers)
)

// Extensions
store.runSaga = sagaMiddleware.run
const persistor = persistStore(store)

export { store, persistor }
