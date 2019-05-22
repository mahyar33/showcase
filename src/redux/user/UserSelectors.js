/**
 * Homepage selectors
 */

import { createSelector } from 'reselect'

const selectUser = state => state.user

const makeSelectSession = () => createSelector(selectUser, userState => userState.get('session'))
const makeSelectRole = () => createSelector(selectUser, userState => userState.get('role'))

export { selectUser, makeSelectSession, makeSelectRole }
