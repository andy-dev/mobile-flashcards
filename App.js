import React from 'react'
import { View, Text, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { Constants } from 'expo'
import { purple } from "./utils/colors";
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation'
import { FontAwesome, Ionicons} from '@expo/vector-icons'
import NewDeck from './components/NewDeck'
import DeckList from './components/DeckList'

function FlashCardsStatusBar({backgroundColor, ...props}){
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}


const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions:{
      tabBarIcon: ()=> <FontAwesome name='home' size={30} color='black' />
    }
  },
  NewDeck:{
    screen: NewDeck,
    navigationOptions:{
      tabBarIcon: ()=> <Ionicons name='ios-add' size={30} color='black' />
    }
  }
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex:1}}>
          <FlashCardsStatusBar backgroundColor={purple} barStyle='light-content'/>
            <Tabs/>
        </View>
      </Provider>
    )
  }
}


