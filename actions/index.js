export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const DELETE_DECK = 'DELETE_DECK';
export const ADD_QUESTION = 'ADD_QUESTION';

export function receiveAllDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}

export function addQuestionToDeck (id, question) {
  return {
    type: ADD_QUESTION,
    id,
    question,
  }
}


export function removeDeckById (id) {
  return {
    type: DELETE_DECK,
    id,
  }
}