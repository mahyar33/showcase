/**
 * Homepage selectors
 */

import { createSelector } from 'reselect'

const selectNumber = state => state.number

const makeSelectNumberList = () => createSelector(selectNumber, numberState => numberState.get('list'))

export { selectNumber, makeSelectNumberList }
