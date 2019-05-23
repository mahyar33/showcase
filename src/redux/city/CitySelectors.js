// Cuts city where is saved data from redux store.

import { createSelector } from 'reselect'

const selectCity = state => state.city

const makeSelectCityList = () => createSelector(selectCity, cityState => cityState.get('list').toJS())

export { selectCity, makeSelectCityList }
