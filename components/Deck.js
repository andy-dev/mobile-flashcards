import React, { Component } from 'react'
import { View, Text,  StyleSheet, TouchableOpacity, Platform} from 'react-native'
import {connect} from 'react-redux'
import {purple, white} from "../utils/colors";
import {clearLocalNotification} from "../utils/helpers";

function AddCardBtn({onPress}){
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
      onPress={onPress}>
      <Text style={styles.submitBtnText}>Add Card</Text>
    </TouchableOpacity>
  )
}

function StartQuizBtn({onPress}){
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
      onPress={onPress}>
      <Text style={styles.submitBtnText}>Start Quiz</Text>
    </TouchableOpacity>
  )
}


class Deck extends Component{
  static navigationOptions = ({navigation}) =>{
    const { title } = navigation.state.params
    return {
      title: title
    }
  };

  startQuiz(deckId){
    clearLocalNotification()
    this.props.navigation.navigate('Quiz', {deckId: deckId, })
  }

  render(){
    const { deckId, deck } = this.props;

    return (
     <View style={styles.container}>
       <Text style={styles.mainHeader}>Title: {deck.title}</Text>
       <Text style={{fontSize:20}}>Num of Cards: {deck.questions.length} cards</Text>
       <View style={styles.row}>
         <AddCardBtn onPress={()=>this.props.navigation
           .navigate('AddQuestion', {
             deckId: deckId,
           })}/>
       </View>
       <View style={styles.row}>
         <StartQuizBtn onPress={ () => this.startQuiz(deckId)}/>
       </View>
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
  mainHeader:{
    fontSize: 30,
    alignItems: 'center'
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

export default connect(mapStateToProps)(Deck);




