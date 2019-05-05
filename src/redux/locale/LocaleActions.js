/*
 *
 * LanguageProvider actions
 *
 */

import { CHANGE_LOCALE } from './LocaleConstants'

export function changeLocale(languageLocale) {// eslint-disable-line
  return {
    type: CHANGE_LOCALE,
    locale: languageLocale
  }
}
