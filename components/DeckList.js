import React, { Component } from 'react'
import { View, Text, Platform, StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import {receiveAllDecks, removeDeckById} from "../actions/index";
import {fetchAllDecks} from "../utils/api";
import {removeDeck} from "../utils/api";
import {purple, white, orange} from "../utils/colors";
import Deck from './Deck'
import { Ionicons } from '@expo/vector-icons'


function RemoveDeckBtn({onPress}){
  return (
    <TouchableOpacity
      style={styles.deleteBtn}
      onPress={onPress}>
      <Text style={styles.submitBtnText}>
        <Ionicons
          name={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'}
          size={45}
        />
      </Text>
    </TouchableOpacity>
  )
}

function GoToDeckBtn({onPress, title, cardLength}){
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
      onPress={onPress}>
      <View>
        <Text style={styles.submitBtnText}>{title}</Text>
        <Text style={styles.submitBtnText}>{cardLength} cards</Text>
      </View>
    </TouchableOpacity>
  )
}


class DeckList extends Component{

  componentDidMount(){
    const {dispatch} = this.props;

    fetchAllDecks()
      .then((decks)=> dispatch(receiveAllDecks(decks)))
  }

  removeDeckFromList = (key) => {
    // //update redux
    this.props.dispatch(removeDeckById(key));

    //update db
    removeDeck(key)
  };

  render(){
    let showThis = null;

    if(JSON.stringify(this.props.decks) === '{}'){
      showThis =
        (
          <View style={styles.row}>
            <Text style={styles.noDeckAddedMssg}>No Decks have been added</Text>
          </View>

        )
    } else {
      showThis = Object.keys(this.props.decks).map((key)=>{
        return (
          <View key={key} style={styles.deckContainer}>
            <View style={[styles.box, {flex:5}]}>
              <GoToDeckBtn title={this.props.decks[key].title}
                           cardLength={this.props.decks[key].questions.length}
                           onPress={()=>this.props.navigation
              .navigate('Deck', {
                deckId: key,
                title:this.props.decks[key].title
              })}/></View>
            <View style={[styles.box, {flex:1}]}>
              <RemoveDeckBtn onPress={()=>{this.removeDeckFromList(key)}} />
            </View>
          </View>
        )
      })
    }

    return(
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.mainHeader}>DeckList</Text>
        </View>
        <ScrollView>
          {showThis}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: purple,
  },
  row:{
    margin: 10,
    alignItems: 'center',
  },
  deckContainer:{
    flexDirection:'row',
  },
  noDeckAddedMssg:{
    color: white,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    padding: 60,
  },
  box: {
    height: 100,
    margin: 10,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtn:{
    height: 100,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerView:{
    backgroundColor: purple,
    alignItems: 'center',
    padding: 30,
  },
  mainHeader:{
    fontSize: 30,
    color: white,
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
    backgroundColor: '#e76e63',
    padding: 10,

    marginLeft: 40,
    marginRight:40,
  },
  androidSubmitBtn:{
    backgroundColor: '#e76e63',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
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



