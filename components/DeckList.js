import React, { Component } from 'react'
import { View, Text, Platform, StyleSheet, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {receiveAllDecks, removeDeckById} from "../actions/index";
import {fetchAllDecks} from "../utils/api";
import {removeDeck} from "../utils/api";
import {purple, white} from "../utils/colors";
import Deck from './Deck'



function RemoveDeckBtn({onPress}){
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
      onPress={onPress}>
      <Text style={styles.submitBtnText}>Remove Deck</Text>
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


class DeckList extends Component{


  componentDidMount(){
    const {dispatch} = this.props;

    fetchAllDecks()
      .then((decks)=> dispatch(receiveAllDecks(decks)))
  }

  removeDeckFromList = (key)=>{
    // //update redux
    this.props.dispatch(removeDeckById(key))

    //update db
    removeDeck(key)
  };

  render(){

    let showThis = null;

    if(JSON.stringify(this.props.decks) === '{}'){
      showThis = <Text>No Decks have been added</Text>
    } else {
      showThis = Object.keys(this.props.decks).map((key)=>{
        return(
          <View key={key}>
            <Text>{JSON.stringify(this.props.decks)}</Text>
            <Text>{this.props.decks[key].title}</Text>
            <RemoveDeckBtn onPress={()=>{this.removeDeckFromList(key)}} />
            <GoToDeck onPress={()=>this.props.navigation
              .navigate('Deck', {
                deckId: key,
                title:this.props.decks[key].title
              })}/>

          </View>
        )
      })
    }


    return(
      <View>
        <Text>DeckList</Text>
        <Text>{JSON.stringify(this.props.decks)}</Text>

        {showThis}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: 'center',
    justifyContent:'center',
    padding:20,
    backgroundColor:white,
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

function mapStateToProps(decks){
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList)