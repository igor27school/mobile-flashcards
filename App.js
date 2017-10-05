import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import DeckSummary from './components/DeckSummary'

export default class App extends Component {
  render() {
    const decks = [
      {
        title: 'udacicards',
        numberCards: 3,
      },
      {
        title: 'new deck',
        numberCards: 0,
      },
      {
        title: 'New deck 2',
        numberCards: 0,
      },
    ]
    return (
      <View style={styles.container}>
        {decks.map(deck => (
          <DeckSummary
            key={deck.title}
            title={deck.title}
            numberCards={deck.numberCards} />
        ))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
})
