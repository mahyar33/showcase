// Handles saga functions related to city.
import { take, fork, call, put, takeLatest, cancel } from 'redux-saga/effects'
import CitySocket from '../../socket/CitySocket'
import { createSocketChannel } from '../../configs/redux/Saga'
import { cityListErrorAction, cityListSuccessfulAction, setCityListAction } from './CityActions'
import { onNetworkError, onSocketError } from '../global/GlobalSaga'
import { LOCATION_CHANGE } from 'connected-react-router'
import CityServices from '../../services/CityServices'
import { CITY_LIST } from './CityConstants'
// Listen to [`CitySocket.backgroundEvents`](../../socket/CitySocket.html) events in [**channel**](../../configs/redux/saga.html).<br />
// Waits till something puts in channel.<br />
// If data are received from socket, `setCityListAction` calls and puts data in redux store.<br />
// If error occurs, `onSocketError` calls to call api related to socket in order to get lost data from socket and checks internet connection to
// move app in offline mode or not. After api call,it connects to socket automatically again.
export function * onCitySocket () {
  const { events, api } = CitySocket.backgroundEvents()
  const socketChannel = yield call(createSocketChannel, events)
  while (true) {
    try {
      const payload = yield take(socketChannel)
      yield put(setCityListAction(payload))
      console.log('payload', payload)
    } catch (err) {
      console.error('socket error:', err.message)
      yield fork(onSocketError, err, api)
    }
  }
}
// Calls `onCitySocket` when saga starts to handle saga in background.
function * watchCitySocket () {
  yield fork(onCitySocket)
}
// Calls [`CityServices.list`]`(../../services/CityServices.html) to get data from server.<br />
// If it's resolved, it calls `cityListSuccessfulAction`. If it's rejected, jumps to catch block and calls `cityListErrorAction`.<br />
// `onNetworkError` is used to handle offline mode.
export function * onCityList (params) {
  console.log('onCityList', params)
  try {
    const payload = yield call(CityServices.list)
    yield put(cityListSuccessfulAction(payload.data))
  } catch (err) {
    yield put(cityListErrorAction(err))
    yield fork(onNetworkError, err, params)
  }
}
// Listens to the action which return `{ type : CITY_LIST }` and calls `onCityList`.<br />
// If route changes, saga operation stops and again listen to 'CITY_LIST' till the related action calls.
function * watchCityList () {
  while (true) {
    const watcher = yield takeLatest(CITY_LIST, onCityList)
    yield take(LOCATION_CHANGE)
    yield cancel(watcher)
  }
}
export default [watchCitySocket(), watchCityList()]
