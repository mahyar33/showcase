// Cuts male where is saved data from redux store.

import { createSelector } from 'reselect'

const selectMale = state => state.male

const makeSelectMaleList = () => createSelector(selectMale, maleState => maleState.get('list').toJS())

export { selectMale, makeSelectMaleList }
