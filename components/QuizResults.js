import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import { red, green, white } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/notificationsHelper'
import Button from './Button'

export default class QuizResults extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          title: PropTypes.string.isRequired,
          percentage: PropTypes.string.isRequired,
          restartQuiz: PropTypes.func.isRequired,
          backToDeck: PropTypes.func.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }
  static navigationOptions = ({ navigation }) => {
    return { title: `${navigation.state.params.title} Quiz Results` }
  }
  componentDidMount() {
    clearLocalNotification().then(setLocalNotification)
  }
  render() {
    const { percentage, restartQuiz, backToDeck } = this.props.navigation.state.params
    return (
      <View style={styles.container}>
        <Text>You got {percentage}% correct</Text>
        <View>
          <Button
            backgroundColor={green}
            onPress={restartQuiz}
            text='Restart Quiz'
            textColor={white}
          />
          <Button
            backgroundColor={red}
            onPress={backToDeck}
            text='Back to Deck'
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
})
