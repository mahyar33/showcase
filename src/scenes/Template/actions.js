import { temp } from './constants';


export function tempAction(name) {
  return {
    type: temp,
    name,
  };
}
