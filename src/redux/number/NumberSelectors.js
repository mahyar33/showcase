// Cuts number where is saved data from redux store.

import { createSelector } from 'reselect'

const selectNumber = state => state.number

const makeSelectNumberList = () => createSelector(selectNumber, numberState => numberState.get('list'))

export { selectNumber, makeSelectNumberList }
