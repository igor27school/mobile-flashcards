import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { gray } from '../utils/colors'

export default class DeckSummary extends Component {
  render() {
    const { title, numberCards } = this.props
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 24}}>{title}</Text>
        <Text style={{color: gray}}>{numberCards} {numberCards == 1 ? 'card' : 'cards'}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 1,
  },
})
