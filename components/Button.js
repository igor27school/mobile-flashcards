import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { saveDeckTitle } from '../utils/api'
import { addDeck } from '../actions'

export default class Button extends Component {
  static propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
  }
  render() {
    const { backgroundColor, onPress, text, textColor } = this.props
    return (
      <TouchableOpacity
        style={[styles.androidSubmitBtn, {backgroundColor}]}
        onPress={this.props.onPress}
      >
        <Text style={[styles.submitBtnText, {color: textColor}]}>
          {this.props.text}
        </Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  androidSubmitBtn: {
    borderRadius: 5,
    borderWidth: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  submitBtnText: {
    fontSize: 14,
    textAlign: 'center',
  },
})
