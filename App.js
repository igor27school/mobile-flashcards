import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import reducer from './reducers'
import Decks from './components/Decks'
import NewDeck from './components/NewDeck'
import DeckDetails from './components/DeckDetails'
import NewCard from './components/NewCard'
import Quiz from './components/Quiz'
import QuizResults from './components/QuizResults'

const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
    },
  },
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  NewDeck: {
    screen: NewDeck,
  },
  DeckDetails: {
    screen: DeckDetails,
  },
  NewCard: {
    screen: NewCard,
  },
  Quiz: {
    screen: Quiz,
  },
  QuizResults: {
    screen: QuizResults,
  },
})

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <View style={{height: Constants.statusBarHeight}}>
            <StatusBar translucent />
          </View>
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}
