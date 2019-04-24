/*
  Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router/immutable';

import { persistReducer } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import storage from 'redux-persist/lib/storage';
import languageProviderReducer from '../languageProvider/reducer';
import history from '../history/history';

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    language: languageProviderReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });
  /*
    Config persist stores & defining them in whitelist.
   */
  const persistConfig = {
    transforms: [immutableTransform()],
    key: 'root',
    storage,
    whitelist: ['global', 'language'],
  };
  return persistReducer(persistConfig, rootReducer);
}
