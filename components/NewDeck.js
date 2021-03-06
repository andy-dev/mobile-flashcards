import React, { Component } from 'react'
import { View, Text, TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Platform} from 'react-native'
import {submitNewDeck } from "../utils/api";
import {connect} from 'react-redux'
import {addDeck} from "../actions/index";
import {purple, white} from "../utils/colors";

var cuid = require('cuid');

function SubmitBtn({onPress}){
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
      onPress={onPress}>
      <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}


class NewDeck extends Component{
  state = {
    input: ''
  };

  submit = () =>{
    const key = cuid();
    let entry = {
      title: this.state.input,
      questions: []
    };

    this.setState(()=>({
      input: ''
    }));

    // Update Redux
    this.props.dispatch(addDeck({
      [key]: entry
    }));

    // Save New Deck to DB
    submitNewDeck({key, entry});

    // Navigate to Deck
    this.props.navigation.navigate('Deck', {
      deckId: key,
      title: this.state.input
    })
  };


  handleTextChange = (input) => {
    this.setState(()=>({
      input
    }))
  };


  render(){
    const {input} = this.state;
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.mainHeader}>ADD DECK</Text>
        </View>
        <View style={styles.row}>
          <Text>Title of new deck?</Text>
        </View>
        <TextInput
          value={input}
          style={styles.input}
          onChangeText={this.handleTextChange}
        />
        <SubmitBtn onPress={this.submit}/>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: 'center',
    padding:20,
    backgroundColor:white,
  },
  row:{
    margin: 10,
    alignItems: 'center',
  },
  mainHeader:{
    fontSize: 30,
    alignItems: 'center'
  },
  input:{
    width:200,
    height:50,
    padding: 8,
    borderWidth: 1,
    margin: 50
  },
  iosSubmitBtn:{
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height:45,
    marginLeft: 40,
    marginRight:40,
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

export default connect()(NewDeck);




