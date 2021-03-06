import React, { Component } from 'react'
import { View, Text, TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Platform} from 'react-native'
import {submitNewDeck, removeDeck, clearAllDecks, submitNewQuestion} from "../utils/api";
import {connect} from 'react-redux'
import {addDeck, addQuestionToDeck} from "../actions/index";
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
  state = {
    answer: '',
    question: ''
  };

  submit = (deckId) => {

    let entry = {
      question: this.state.question,
      answer: this.state.answer,
    };

    let key = this.props.deckId;

    this.setState(()=>({
      answer: '',
      question: ''
    }));

    // Update Redux
    this.props.dispatch(addQuestionToDeck(key, entry))

    //Update DB
    submitNewQuestion(deckId, entry)

    // Navigate to Deck
    this.props.navigation.goBack()
  };

  handleQuestionChange = (questionInput) => {
    this.setState((state)=>{
      return {
        ...state,
        question: questionInput,
      }
    })
  };

  handleAnswerChange = (answerInput) => {
    this.setState((state)=>{
      return {
        ...state,
        answer: answerInput,
      }
    })
  };

  static navigationOptions = ({navigation}) =>{
    const { title } = navigation.state.params
    return {
      title: "Add Card"
    }
  };

  render(){
    const {answer, question} = this.state;
    const { deckId, deck } = this.props;

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={{fontSize:20}}>Question</Text>
        <TextInput
          style={styles.input}
          value={question}
          onChangeText={this.handleQuestionChange}/>

        <Text style={{fontSize:20}}>Answer</Text>
        <TextInput
          style={styles.input}
          value={answer}
          onChangeText={this.handleAnswerChange}/>

        <SubmitQuestionBtn onPress={()=>{this.submit(deckId)}}/>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:white,
    padding: 15,
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

function mapStateToProps(state, {navigation}){
  const { deckId } = navigation.state.params;
  return {
    deckId,
    deck: state[deckId]
  }
}


export default connect(mapStateToProps)(AddQuestion);