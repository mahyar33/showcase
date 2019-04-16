/**
 * Homepage selectors
 */

import {createSelector} from 'reselect';
import {initialState} from './reducer';

const selectHome = state =>  state.temp;

const makeTemp = () =>
    createSelector(selectHome, homeState => homeState.get('temp'));

export {selectHome, makeTemp};
