import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { gray } from '../utils/colors'
import { deleteDeck } from '../utils/api'
import { white, black } from '../utils/colors'
import { removeDeck } from '../actions'
import Button from './Button'

export class DeckSummary extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    numberCards: PropTypes.number.isRequired,
  }
  delete = () => {
    const { title } = this.props
    this.props.dispatch(removeDeck(title))
    deleteDeck(title)
  }
  render() {
    const { title, numberCards } = this.props
    return (
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => this.props.navigation.navigate(
              'DeckDetails',
              {
                title: title,
                numberCards: numberCards,
              }
            )}
        >
          <Text style={{fontSize: 24}}>{title}</Text>
          <Text style={{color: gray}}>{numberCards} {numberCards == 1 ? 'card' : 'cards'}</Text>
        </TouchableOpacity>
        <Button
          onPress={this.delete}
          backgroundColor={black}
          text='Delete'
          textColor={white}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
  },
})

export default connect()(DeckSummary)
