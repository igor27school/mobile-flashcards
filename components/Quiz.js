import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { deleteDeck } from '../utils/api'
import { red, green, white } from '../utils/colors'
import { QUESTION_TYPE, ANSWER_TYPE } from '../utils/constants'
import { removeDeck } from '../actions'
import Button from './Button'

export class Quiz extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          title: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
    questionNumber: PropTypes.number.isRequired,
    numberCards: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf([QUESTION_TYPE, ANSWER_TYPE]).isRequired,
    correct: PropTypes.func.isRequired,
    incorrect: PropTypes.func.isRequired,
  }
  static navigationOptions = ({ navigation }) => {
    return { title: `${navigation.state.params.title} Quiz` }
  }
  render() {
    const { questionNumber, numberCards, text, type, correct, incorrect } = this.props
    const { setParams } = this.props.navigation
    const questionsLeft = numberCards - questionNumber
    return (
      <View style={styles.container}>
        <View style={styles.contents}>
          <Text style={{fontSize: 24, textAlign: 'center'}}>{text}</Text>
          <Button
            backgroundColor={white}
            onPress={() => setParams({type: type === QUESTION_TYPE ? ANSWER_TYPE : QUESTION_TYPE})}
            text={type === QUESTION_TYPE ? 'Show Answer' : 'Show Question'}
            textColor={red}
          />
        </View>
        <Text>
          {questionsLeft === 0
            ? 'Last question'
            : `${questionsLeft} ${questionsLeft === 1 ? 'question' : 'questions'} left`
          }
        </Text>
        <View>
          <Button
            backgroundColor={green}
            onPress={correct}
            text='Correct'
            textColor={white}
          />
          <Button
            backgroundColor={red}
            onPress={incorrect}
            text='Incorrect'
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
  contents: {
    alignItems: 'center',
  },
})

function mapStateToProps(decks, { navigation }) {
  const { title, questionNumber, numberCards, type, correct, incorrect } = navigation.state.params
  return {
    questionNumber,
    numberCards,
    text: decks[title].questions[questionNumber-1][type],
    type,
    correct,
    incorrect,
  }
}

export default connect(mapStateToProps)(Quiz)
