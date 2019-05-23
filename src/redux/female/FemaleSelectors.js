// Cuts female where is saved data from redux store.
import { createSelector } from 'reselect'

const selectFemale = state => state.female

const makeSelectFemaleList = () => createSelector(selectFemale, femaleState => femaleState.get('list').toJS())

export { selectFemale, makeSelectFemaleList }
