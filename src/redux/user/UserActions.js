import { temp } from './constants'

export function tempAction(name) {// eslint-disable-line
  return {
    type: temp,
    name
  }
}
