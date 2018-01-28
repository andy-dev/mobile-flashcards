import React, { Component } from 'react'
import { View, Text, TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Platform} from 'react-native'
import {submitNewDeck, removeDeck, clearAllDecks} from "../utils/api";
import {connect} from 'react-redux'
import {addDeck} from "../actions/index";
import {purple, white} from "../utils/colors";
import {StackNavigator} from "react-navigation"



function ShowAnswerBtn({onPress, displayingAnswer}){
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
      onPress={onPress}>
      {displayingAnswer === false ?
        <Text style={styles.submitBtnText}>Show Answer</Text> :
        <Text style={styles.submitBtnText}>Show Question</Text>}

    </TouchableOpacity>
  )
}

function CorrectBtn({onPress}){
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
      onPress={onPress}>
      <Text style={styles.submitBtnText}>Correct</Text>
    </TouchableOpacity>
  )
}

function RestartQuiz({onPress}){
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
      onPress={onPress}>
      <Text style={styles.submitBtnText}>Restart Quiz</Text>
    </TouchableOpacity>
  )
}

function GoToDeck({onPress}){
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
      onPress={onPress}>
      <Text style={styles.submitBtnText}>Go To Deck</Text>
    </TouchableOpacity>
  )
}

function IncorrectBtn({onPress}){
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
      onPress={onPress}>
      <Text style={styles.submitBtnText}>Incorrect</Text>
    </TouchableOpacity>
  )
}


class Quiz extends Component{

  state ={
    currentQuestionDisplayed: 0,
    totalNumberOfCards: this.props.deck.questions.length,
    displayingAnswer : false,
    totalCorrect: 0
  }

  goToNextQuestion = () => {
    const { currentQuestionDisplayed, displayingAnswer, totalCorrect } = this.state
    console.log("next question")
  }

  correctAnswer = () => {
    const { currentQuestionDisplayed, totalCorrect } = this.state
    this.setState((state)=>{
      return {
        ...state,
        currentQuestionDisplayed: currentQuestionDisplayed + 1,
        displayingAnswer: false,
        totalCorrect: totalCorrect + 1
      }
    })
  }

  showAnswerQuestionToggle = () =>{
    const { displayingAnswer } = this.state
    this.setState((state)=>{
      return {
        ...state,
        displayingAnswer: !displayingAnswer
      }
    })
  }

  static navigationOptions = ({navigation}) =>{
    const { title } = navigation.state.params
    return {
      title: "Quiz"
    }
  };

  render(){

    let showThis = null

    const {currentQuestionDisplayed, displayingAnswer, totalNumberOfCards, totalCorrect} = this.state
    const { deckId, deck } = this.props

    if(currentQuestionDisplayed === totalNumberOfCards){
      showThis =
        <View>
          <Text>No More questions, you scored  {totalCorrect}/{totalNumberOfCards}</Text>
          <GoToDeck onPress={()=>this.props.navigation
            .navigate('Deck', {
              deckId: deckId,
              title:this.props.deck.title
            })}/>
          <RestartQuiz onPress={()=>this.props.navigation
            .navigate('Quiz', {
              deckId: deckId
            })}/>
        </View>
    } else {
      showThis =
        (
        <View>
          <Text>Quiz {currentQuestionDisplayed + 1}/{totalNumberOfCards}</Text>
          {displayingAnswer === false
            ? <Text>Question {deck.questions[0].question}</Text>
            : <Text>Answers {deck.questions[0].question}</Text>}

          <ShowAnswerBtn onPress={this.showAnswerQuestionToggle} displayingAnswer={displayingAnswer} />
          <CorrectBtn onPress={this.correctAnswer} />
          <IncorrectBtn onPress={this.incorrectAnswer}/>
        </View>
        )
    }

    return (

      <View style={styles.container}>
        {showThis}
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


export default connect(mapStateToProps)(Quiz);