/*
  Combine all reducers in this file and export the combined reducers and Config persist stores & defining them in whitelist.

 */

import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router/immutable'

import { persistReducer } from 'redux-persist'
import immutableTransform from 'redux-persist-transform-immutable'
import storage from 'redux-persist/lib/storage'
import languageProviderReducer from '../../redux/locale/LocaleReducer'
import History from '../History'
import UserReducer from '../../redux/user/UserReducer'
import globalReducer from '../../redux/global/GlobalReducer'
import CityReducer from '../../redux/city/CityReducer'
import FemaleReducer from '../../redux/female/FemaleReducer'
import MaleReducer from '../../redux/male/MaleReducer'
import NumberReducer from '../../redux/number/NumberReducer'

export default function CreateReducer (injectedReducers = {}) {
  const rootReducer = combineReducers({
    language: languageProviderReducer,
    user: UserReducer,
    global: globalReducer,
    city: CityReducer,
    female: FemaleReducer,
    male: MaleReducer,
    number: NumberReducer,
    router: connectRouter(History),
    ...injectedReducers
  })

  const persistConfig = {
    transforms: [immutableTransform()],
    key: 'root',
    storage,
    whitelist: [ 'language', 'user']
  }
  return persistReducer(persistConfig, rootReducer)
}
