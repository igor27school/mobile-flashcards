import React, { Component } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addCardToDeck } from '../utils/api'
import { white, black } from '../utils/colors'
import { receiveCard } from '../actions'
import Button from './Button'

export default class Input extends Component {
  static propTypes = {
    placeholder: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
  }
  render() {
    const { placeholder, value, onChangeText } = this.props
    return (
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    )
  }
}

const styles = StyleSheet.create({
  input: {
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
