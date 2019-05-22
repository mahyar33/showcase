import { CITY_LIST, CITY_LIST_ERROR, CITY_LIST_SUCCESSFUL, SET_CITY_LIST } from './CityConstants'

export const setCityListAction = (payload) => {
  return {
    type: SET_CITY_LIST,
    payload
  }
}

export const cityListAction = () => {
  return {
    type: CITY_LIST
  }
}
export const cityListSuccessfulAction = (payload) => {
  return {
    type: CITY_LIST_SUCCESSFUL,
    payload
  }
}
export const cityListErrorAction = (payload) => {
  return {
    type: CITY_LIST_ERROR,
    payload
  }
}
