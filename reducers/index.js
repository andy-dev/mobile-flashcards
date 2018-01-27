import { RECEIVE_DECKS, ADD_DECK, DELETE_DECK } from '../actions'

function entries (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks,
      };
    case ADD_DECK :
      return {
        ...state,
        ...action.deck
      };
    case DELETE_DECK :
      return Object.assign({}, Object.keys(state).reduce(( accum, key)=>{
        if(key !== action.id){
          accum[key] = state[key]
        }
        return accum
      },{}));
    default :
      return state
  }
}

export default entries