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
      const data = JSON.parse(results)
      data[title] = undefined
      delete data[title]
      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
  })
}
