import { take, fork, call, putResolve, put, takeLatest, cancel } from 'redux-saga/effects'
import CitySocket from '../../socket/CitySocket'
import { createSocketChannel } from '../../configs/redux/SagaChannel'
import { cityListErrorAction, cityListSuccessfulAction, setCityListAction } from './CityActions';
import { checkNetworkFailureAction } from '../global/GlobalActions'
import { maleListErrorAction, maleListSuccessfulAction } from '../male/MaleActions'
import { onNetworkError } from '../global/GlobalSaga'
import { LOCATION_CHANGE } from 'connected-react-router'
import CityServices from '../../services/CityServices'
import { CITY_LIST } from './CityConstants'

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
      for (const item of api) {
        yield putResolve(checkNetworkFailureAction(item))
      }
    }
  }
}

function * watchCitySocket () {
  yield fork(onCitySocket)
}
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

function * watchCityList () {
  while (true) {
    const watcher = yield takeLatest(CITY_LIST, onCityList)
    yield take(LOCATION_CHANGE)
    yield cancel(watcher)
  }
}
export default [watchCitySocket(), watchCityList()]
