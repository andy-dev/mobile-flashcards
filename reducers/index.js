import { RECEIVE_DECKS, ADD_DECK, DELETE_DECK, ADD_QUESTION } from '../actions'


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
    case ADD_QUESTION :
      return {
        ...state,
        [action.id]:{
          ...state[action.id],
          questions: [ ...state[action.id].questions , action.question]
        }

      }

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