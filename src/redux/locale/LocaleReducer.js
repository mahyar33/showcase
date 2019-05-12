/*
 *
 * LanguageProvider reducer
 *
 */

import { fromJS } from 'immutable'

import { SET_LOCALE } from './LocaleConstants'
import { DEFAULT_LOCALE } from '../../assets/translations/I18n'

export const initialState = fromJS({
  locale: DEFAULT_LOCALE
})

function languageProviderReducer (state = initialState, action) {
  switch (action.type) {
    case SET_LOCALE:
      return state.set('locale', action.locale)
    default:
      return state
  }
}

export default languageProviderReducer
