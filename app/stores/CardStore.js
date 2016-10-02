import AppDispatcher from '../AppDispatcher';
import constants from '../constants';
import {ReduceStore} from 'flux/utils';

class CardStore extends ReduceStore {
  getInitialState() {
    return { "cards": [] };
  }

  reduce(state, action) {
    switch(action.type) {
      case constants.FETCH_CARDS_SUCCESS:
        return { "cards": action.payload.response };
      default:
        return state;
    }
  }
}

export default new CardStore(AppDispatcher);
