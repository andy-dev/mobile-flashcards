import { AsyncStorage } from 'react-native'


export const FLASHCARDS_STORAGE_KEY = 'flashcards:mobile'


export function fetchAllDecks(){
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((results) =>{
      const data = JSON.parse(results)
      return data
    })
}


export function submitNewDeck ({ entry, key }) {
  return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
    [key]: entry
  }))
}

export function submitNewQuestion (key, entry) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key].questions.push(entry)
      console.log(data)
      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
    })
}

export function removeDeck (key) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
    })
}


