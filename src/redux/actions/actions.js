import { temp } from '../constant/constants';


export function tempAction(name) {// eslint-disable-line
  return {
    type: temp,
    name,
  };
}
