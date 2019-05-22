/*
 *
 * LanguageProvider actions
 *
 */

import { SET_LOCALE } from './LocaleConstants'

export function setLocale(languageLocale) {// eslint-disable-line
  return {
    type: SET_LOCALE,
    locale: languageLocale
  }
}
