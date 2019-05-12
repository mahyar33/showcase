import { createSelector } from 'reselect'

const selectGlobal = state => state.global

const makeSelectTopMessage = () => createSelector(selectGlobal, globalState => globalState.get('topMessage'))

export { selectGlobal, makeSelectTopMessage }
