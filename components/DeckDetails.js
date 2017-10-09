import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { deleteDeck } from '../utils/api'
import { white, black, gray } from '../utils/colors'
import { removeDeck } from '../actions'
import Button from './Button'

export class DeckDetails extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    numberCards: PropTypes.number.isRequired,
  }
  static navigationOptions = ({ navigation }) => {
    return { title: navigation.state.params.title }
  }
  delete = () => {
    const { title } = this.props
    this.props.dispatch(removeDeck(title))
    deleteDeck(title)
  }
  addCard = () => {
    const { title, numberCards } = this.props
    this.props.navigation.navigate(
      'NewCard',
      {
        deckTitle: title,
      }
    )
  }
  startQuiz = () => {
    // TODO: Implement
  }
  render() {
    const { title, numberCards } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.deckInfo}>
          <Text style={{fontSize: 24}}>{title}</Text>
          <Text style={{color: gray}}>{numberCards} {numberCards == 1 ? 'card' : 'cards'}</Text>
        </View>
        <View>
          <Button
            backgroundColor={white}
            onPress={this.addCard}
            text='Add Card'
            textColor={black}
          />
          <Button
            backgroundColor={black}
            onPress={this.startQuiz}
            text='Start Quiz'
            textColor={white}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 5,
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  deckInfo: {
    alignItems: 'center',
  },
})

function mapStateToProps(decks, { navigation }) {
  const { title } = navigation.state.params
  return {
    title,
    numberCards: decks[title].questions.length,
  }
}

export default connect(mapStateToProps)(DeckDetails)
