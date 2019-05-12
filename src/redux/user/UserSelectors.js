/**
 * Homepage selectors
 */

import { createSelector } from 'reselect'

const selectUser = state => state.user

const makeSelectSession = () => createSelector(selectUser, userState => userState.get('session'))

export { selectUser, makeSelectSession }
