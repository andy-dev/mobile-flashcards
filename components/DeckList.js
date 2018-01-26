import React, { Component } from 'react'
import { View, Text} from 'react-native'
import {connect} from 'react-redux'
import {receiveAllDecks} from "../actions/index";
import {fetchAllDecks} from "../utils/api";

class DeckList extends Component{

  componentDidMount(){
    const {dispatch} = this.props

    fetchAllDecks()
      .then((decks)=> dispatch(receiveAllDecks(decks)))


  }

  render(){
    return(
      <View>
        <Text>DeckList</Text>
        <Text>{JSON.stringify(this.props)}</Text>
      </View>
    )
  }
}

function mapStateToProps(decks){
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList)