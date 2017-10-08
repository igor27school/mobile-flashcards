export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const RECEIVE_DECK = 'RECEIVE_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'
export const RECEIVE_CARD = 'RECEIVE_CARD'

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function receiveDeck (title) {
  return {
    type: RECEIVE_DECK,
    title,
  }
}

export function removeDeck (title) {
  return {
    type: REMOVE_DECK,
    title,
  }
}

export function receiveCard (title, card) {
  return {
    type: RECEIVE_CARD,
    title,
    card,
  }
}
