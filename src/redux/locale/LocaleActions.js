// All actions related to locale.

import { SET_LOCALE } from './LocaleConstants'

export function setLocale (languageLocale) {
  return {
    type: SET_LOCALE,
    locale: languageLocale
  }
}
