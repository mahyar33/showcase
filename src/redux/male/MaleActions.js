// All actions related to male.
import { MALE_LIST, MALE_LIST_SUCCESSFUL, MALE_LIST_ERROR } from './MaleConstants'

export const maleListAction = () => {
  return {
    type: MALE_LIST
  }
}
export const maleListSuccessfulAction = (payload) => {
  return {
    type: MALE_LIST_SUCCESSFUL,
    payload
  }
}
export const maleListErrorAction = (payload) => {
  return {
    type: MALE_LIST_ERROR,
    payload
  }
}
