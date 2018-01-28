import React, { Component } from 'react'
import { View, Text, TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Platform} from 'react-native'
import {submitNewDeck, removeDeck, clearAllDecks} from "../utils/api";
import {connect} from 'react-redux'
import {addDeck} from "../actions/index";
import {purple, white} from "../utils/colors";
import {StackNavigator} from "react-navigation"




function SubmitQuestionBtn({onPress}){
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
      onPress={onPress}>
      <Text style={styles.submitBtnText}>Submit</Text>
    </TouchableOpacity>
  )
}


class AddQuestion extends Component{

  static navigationOptions = ({navigation}) =>{
    const { title } = navigation.state.params

    return {
      title: "Add Question"
    }

  }

  render(){

    const { deckId, deck } = this.props

    return (
      <View style={styles.container}>
       <Text>Hello from New question: {deckId}</Text>
        <SubmitQuestionBtn/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:white,
    padding: 15,
  },
  iosSubmitBtn:{
    backgroundColor: purple,
    padding: 20,
    borderRadius: 7,
    height:45,
    marginLeft: 40,
    marginRight:40,
    justifyContent: 'center',
  },
  androidSubmitBtn:{
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius:2,
    justifyContent: 'center',
    alignItems:'center'
  },
  submitBtnText:{
    color: white,
    fontSize: 22,
    textAlign: 'center'
  }
});

// we get passed state and props, that has a navigation key
function mapStateToProps(state, {navigation}){
  const { deckId } = navigation.state.params

  return {
    deckId,
    deck: state[deckId]
  }

}


export default connect(mapStateToProps)(AddQuestion);