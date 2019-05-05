/**
 * Homepage selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer';// eslint-disable-line

const selectHome = state => state.temp

const makeTemp = () => createSelector(selectHome, homeState => homeState.get('temp'))

export { selectHome, makeTemp }
