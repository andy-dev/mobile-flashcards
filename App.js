import React from 'react'
import { View, Text, StatusBar, Platform } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { Constants } from 'expo'
import { purple, white } from "./utils/colors";
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation'
import { FontAwesome, Ionicons} from '@expo/vector-icons'
import NewDeck from './components/NewDeck'
import DeckList from './components/DeckList'
import Deck from "./components/Deck";

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
      tabBarLabel: 'Home',
      tabBarIcon: ({tintColor})=> <Ionicons name='ios-home-outline' size={30} color={tintColor} />
    }
  },
  NewDeck:{
    screen: NewDeck,
    navigationOptions:{
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({tintColor})=> <Ionicons name='ios-add' size={30} color={tintColor} />
    }
  }
}, {
  navigationOptions:{
    header:null
  },
  tabBarOptions:{
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor:Platform.OS === 'ios' ? white: purple,
      shadowColor: 'rgba(0,0,0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
});

const MainNavigation = StackNavigator({
  Home:{
    screen: Tabs,
  },
  Deck:{
    screen: Deck,
    navigationOptions:{
      headerTintColor: white,
      headerStyle:{
        backgroundColor: purple
      }
    }
  }
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex:1}}>
          <FlashCardsStatusBar backgroundColor={purple} barStyle='light-content'/>
          <MainNavigation/>
        </View>
      </Provider>
    )
  }
}


