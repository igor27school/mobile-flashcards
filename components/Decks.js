import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions'
import DeckSummary from './DeckSummary'

export class Decks extends Component {
  static propTypes = {
    decks: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
    })).isRequired,
  }
  componentDidMount() {
    if (this.props.decks.length === 0) {
      getDecks()
        .then((decks) => this.props.dispatch(receiveDecks(decks)))
    }
  }
  render() {
    const { decks } = this.props
    return (
      <View style={styles.container}>
        {Array.isArray(decks) && decks.map(deck => (
          <DeckSummary
            key={deck.title}
            title={deck.title}
            navigation={this.props.navigation}
          />
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

function mapStateToProps(decks) {
  return {
    decks: Object.keys(decks).map(deck => ({
      title: deck,
    })),
  }
}

export default connect(mapStateToProps)(Decks)
