import { temp } from '../constant/constants';


export function tempAction(name) {
  return {
    type: temp,
    name,
  };
}
