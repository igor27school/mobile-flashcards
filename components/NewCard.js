import React, { Component } from 'react'
import { StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addCardToDeck } from '../utils/api'
import { white, black } from '../utils/colors'
import { receiveCard } from '../actions'
import Button from './Button'
import Input from './Input'

export class NewCard extends Component {
  static propTypes = {
    deckTitle: PropTypes.string.isRequired,
  }
  state = {
    question: '',
    answer: '',
  }
  submit = () => {
    const { deckTitle } = this.props
    const { question, answer } = this.state
    const card = { question, answer }
    this.props.dispatch(receiveCard(deckTitle, card))
    this.props.navigation.goBack()
    addCardToDeck(deckTitle, card)
    this.setState({question: '', answer: ''})
  }
  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Input
          placeholder='Question'
          value={this.state.question}
          onChangeText={text => this.setState({question: text})}
        />
        <Input
          placeholder='Answer'
          value={this.state.answer}
          onChangeText={text => this.setState({answer: text})}
        />
        <Button
          backgroundColor={black}
          onPress={this.submit}
          text='Submit'
          textColor={white}
        />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'stretch',
    justifyContent: 'space-around',
  },
})

function mapStateToProps(decks, { navigation }) {
  const { deckTitle } = navigation.state.params
  return { deckTitle }
}

export default connect(mapStateToProps)(NewCard)
