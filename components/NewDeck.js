import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { saveDeckTitle } from '../utils/api'
import { white, black } from '../utils/colors'
import { receiveDeck } from '../actions'
import Button from './Button'
import Input from './Input'

export class NewDeck extends Component {
  state = {
    title: '',
  }
  submit = () => {
    const { title } = this.state
    this.props.dispatch(receiveDeck(title))
    this.props.navigation.goBack()
    saveDeckTitle(title)
    this.setState({title: ''})
  }
  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.label}>What is the title of your new deck?</Text>
        <Input
          placeholder='Deck Title'
          value={this.state.title}
          onChangeText={text => this.setState({title: text})}
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
  label: {
    fontSize: 36,
    textAlign: 'center',
  },
  titleInput: {
    fontSize: 12,
    borderWidth: 1,
    borderRadius:3,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    marginLeft: 10,
    marginRight: 10,
  },
})

export default connect()(NewDeck)
