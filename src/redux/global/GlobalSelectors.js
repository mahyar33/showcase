// Cuts global where is saved data from redux store.
import { createSelector } from 'reselect'

const selectGlobal = state => state.global

const makeSelectTopMessage = () => createSelector(selectGlobal, globalState => globalState.get('topMessage'))
const makeSelectNetworkStatus = () => createSelector(selectGlobal, globalState => globalState.get('networkStatus'))
const makeSelectNetworkFailure = () => createSelector(selectGlobal, globalState => globalState.get('networkFailure'))

export { selectGlobal, makeSelectTopMessage, makeSelectNetworkStatus, makeSelectNetworkFailure }
