/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router/immutable';

import history from '../history/history';
import languageProviderReducer from "../languageProvider/reducer";
import {persistReducer} from "redux-persist";
import immutableTransform from "redux-persist-transform-immutable";
import storage from 'redux-persist/lib/storage'
/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    language: languageProviderReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });
  const persistConfig = {
    transforms: [immutableTransform()],
    key: 'root',
    storage,
    whitelist: ['global','language']
  };
  return persistReducer(persistConfig, rootReducer);
}
