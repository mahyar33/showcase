import { fromJS } from 'immutable';

import { temp } from './constants';


export const initialState = fromJS({

});

function tempReducer(state = initialState, action) {
  switch (action.type) {
    case temp:
      // Delete prefixed '@' from the github username
      return state.set('temp', '');
    default:
      return state;
  }
}

export default tempReducer;
