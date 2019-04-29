import { fromJS } from 'immutable';

import { temp } from '../constant/constants';


export const initialState = fromJS({

});

function tempReducer(state = initialState, action) {
  switch (action.type) {
    case temp:
      return state.set('temp', '');
    default:
      return state;
  }
}

export default tempReducer;
