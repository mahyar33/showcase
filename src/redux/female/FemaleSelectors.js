/**
 * Homepage selectors
 */

import { createSelector } from 'reselect'

const selectFemale = state => state.female

const makeSelectFemaleList = () => createSelector(selectFemale, femaleState => femaleState.get('list').toJS())

export { selectFemale, makeSelectFemaleList }
