import React, { Component } from 'react'
import { StyleSheet, Text, View, Animated } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { deleteDeck } from '../utils/api'
import { white, black, gray } from '../utils/colors'
import { QUESTION_TYPE, ANSWER_TYPE } from '../utils/constants'
import { removeDeck } from '../actions'
import Button from './Button'
import Quiz from './Quiz'
import QuizResults from './QuizResults'

export class DeckDetails extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    numberCards: PropTypes.number.isRequired,
  }
  static navigationOptions = ({ navigation }) => {
    return { title: navigation.state.params.title }
  }
  state = {
    questionNumber: 1,
    type: QUESTION_TYPE,
    numberCorrect: 0,
    flexValue: new Animated.Value(0.2),
  }
  componentDidMount() {
    const { flexValue } = this.state

    Animated.spring(flexValue, { toValue: 1, speed: 1 }).start()
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
  evaluate = correctAnswer => {
    const { numberCards, title } = this.props
    const { questionNumber, numberCorrect } = this.state
    const { navigate } = this.props.navigation

    const newNumberCorrect = correctAnswer ? numberCorrect + 1 : numberCorrect
    if (questionNumber === numberCards) {
      navigate(
        'QuizResults',
        {
          title,
          percentage: (100 * newNumberCorrect / numberCards).toFixed(0),
          restartQuiz: this.startQuiz,
          backToDeck: () => navigate(
            'DeckDetails',
            { title }
          )
        }
      )
    } else {
      this.setState({
        questionNumber: questionNumber + 1,
        type: QUESTION_TYPE,
        numberCorrect: newNumberCorrect,
      })
      navigate(
        'Quiz',
        {
          title,
          questionNumber: questionNumber + 1,
          numberCards,
          type: QUESTION_TYPE,
          correct: this.correct,
          incorrect: this.incorrect,
        }
      )
    }
  }
  correct = () => {
    this.evaluate(true)
  }
  incorrect = () => {
    this.evaluate(false)
  }
  startQuiz = () => {
    const { title, numberCards } = this.props
    this.setState({
      questionNumber: 1,
      type: QUESTION_TYPE,
      numberCorrect: 0,
    })
    this.props.navigation.navigate(
      'Quiz',
      {
        title,
        questionNumber: 1,
        numberCards,
        type: QUESTION_TYPE,
        correct: this.correct,
        incorrect: this.incorrect,
      }
    )
  }
  render() {
    const { title, numberCards } = this.props
    const { flexValue } = this.state
    return (
      <Animated.View style={[styles.container, { flex: flexValue }]}>
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
          {numberCards > 0 && (
            <Button
              backgroundColor={black}
              onPress={this.startQuiz}
              text='Start Quiz'
              textColor={white}
            />
          )}
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
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
