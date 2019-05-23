// Cuts language where is saved data from redux store.
import { createSelector } from 'reselect'
import { initialState } from './LocaleReducer'

const selectLanguage = state => (state.language ? state.language : initialState)

const makeSelectLocale = () => createSelector(selectLanguage, languageState => languageState.get('locale'))

export { selectLanguage, makeSelectLocale }
