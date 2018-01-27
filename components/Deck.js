import React, { Component } from 'react'
import { View, Text, TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Platform} from 'react-native'
import {submitNewDeck, removeDeck, clearAllDecks} from "../utils/api";
import {connect} from 'react-redux'
import {addDeck} from "../actions/index";
import {purple, white} from "../utils/colors";
import {StackNavigator} from "react-navigation"




class Deck extends Component{


  render(){

    return (
     <View>
       <Text>Hello from deck</Text>
     </View>
    )
  }
}



export default connect()(Deck);




