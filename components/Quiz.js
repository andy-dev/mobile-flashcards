import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native'
import {connect} from 'react-redux'
import {purple, white} from "../utils/colors";

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

  state = {
    currentQuestionDisplayed: 0,
    totalNumberOfCards: this.props.deck.questions.length,
    displayingAnswer : false,
    totalCorrect: 0
  };

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
  };

  incorrectAnswer = () => {
    const { currentQuestionDisplayed, totalCorrect } = this.state;

    this.setState((state)=>{

      return {
        ...state,
        currentQuestionDisplayed: currentQuestionDisplayed + 1,
        displayingAnswer: false,
        totalCorrect: totalCorrect
      }
    })
  };

  showAnswerQuestionToggle = () => {
    const { displayingAnswer } = this.state;
    this.setState((state)=>{
      return {
        ...state,
        displayingAnswer: !displayingAnswer
      }
    })
  };

  static navigationOptions = ({navigation}) =>{
    return {
      title: "Quiz"
    }
  };

  render(){
    let showThis = null;
    const {currentQuestionDisplayed, displayingAnswer, totalNumberOfCards, totalCorrect} = this.state
    const { deckId, deck } = this.props;

    if(totalNumberOfCards === 0){
      showThis = (
          <View style={styles.row}>
            <Text>No cards added</Text>
          </View>
        )
    } else if(currentQuestionDisplayed === totalNumberOfCards){
      showThis =
        <View>
          <View style={styles.row}>
            <Text>No More questions, you scored  {totalCorrect}/{totalNumberOfCards}</Text>
          </View>

          <View style={styles.row}>
            <GoToDeck onPress={()=>this.props.navigation
              .navigate('Deck', {
                deckId: deckId,
                title:this.props.deck.title
              })}/>
          </View>

          <View style={styles.row}>
            <RestartQuiz onPress={()=>this.props.navigation
              .navigate('Quiz', {
                deckId: deckId
              })}/>
          </View>
        </View>
    } else {
      showThis =
        (
        <View>
          <View style={styles.row}>
            <Text>Quiz {currentQuestionDisplayed + 1}/{totalNumberOfCards}</Text>
          </View>

          {displayingAnswer === false
            ? <View>
                <Text style={{fontSize:20}}>Question:</Text>
                <Text style={{fontSize:20}}>{deck.questions[0].question}</Text>
              </View>
            : <View>
                <Text style={{fontSize:20}}>Answer:</Text>
                <Text style={{fontSize:20}}>{deck.questions[0].answer}</Text>
              </View>}

          <View style={styles.row}>
            <ShowAnswerBtn onPress={this.showAnswerQuestionToggle} displayingAnswer={displayingAnswer} />
          </View>
          <View style={styles.row}>
            <CorrectBtn onPress={this.correctAnswer} />
          </View>
          <View style={styles.row}>
            <IncorrectBtn onPress={this.incorrectAnswer}/>
          </View>

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
  row:{
    margin: 10,
    alignItems: 'center',
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
  const { deckId } = navigation.state.params;

  return {
    deckId,
    deck: state[deckId]
  }
}


export default connect(mapStateToProps)(Quiz);