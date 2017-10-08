export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function addDeck (title) {
  return {
    type: ADD_DECK,
    title,
  }
}

export function removeDeck (title) {
  return {
    type: REMOVE_DECK,
    title,
  }
}
