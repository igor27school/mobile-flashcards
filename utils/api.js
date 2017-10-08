import { AsyncStorage } from 'react-native'

const FLASHCARDS_STORAGE_KEY = 'MobileFlashcards:key'

export function getDecks () {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(results => JSON.parse(results))
}

export function saveDeckTitle (title) {
  return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
    [title]: {
      title: title,
      questions: [],
    },
  }))
}

export function deleteDeck (title) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((results) => {
      const decks = JSON.parse(results)
      decks[title] = undefined
      delete decks[title]
      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decks))
  })
}

export function addCardToDeck (title, card) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((results) => {
      const decks = JSON.parse(results)
      decks[title].questions = decks[title].questions.concat(card)
      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decks))
  })
}
