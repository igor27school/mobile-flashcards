import {
  RECEIVE_DECKS,
  RECEIVE_DECK,
  REMOVE_DECK,
  RECEIVE_CARD,
} from '../actions'

function decks (state={}, action) {
  switch(action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      }
    case RECEIVE_DECK:
      return {
        ...state,
        [action.title]: {
          title: action.title,
          questions: [],
        }
      }
    case REMOVE_DECK:
      const {[action.title]: deletedDeck, ...decks} = state
      return decks
    case RECEIVE_CARD:
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
          questions: state[action.title].questions.concat(action.card),
        }
      }
    default:
      return state
  }
}

export default decks
