import React from 'react'
import { View } from 'react-native'
import AddEntry from './components/AddEntry'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View>
          <AddEntry />
        </View>
      </Provider>
    )
  }
}

//
// state = {
//   input: '@andy-dev',
//   showInput: false,
// }
//
// handleToggleSwitch = (state) => {
//   this.setState(() => ({
//     showInput : !state.showInput,
//   }))
// }
//
// handleTextChange = (input) => {
//   this.setState(()=>({
//     input
//   }))
// }
//
//
// renderItem = ({item}) =>{
//   return <Review {...item}/>
// }


// const {input, showInput} = this.state
// const reviews  = getReviews()


{/*{showInput === true && (*/}
{/*<TextInput value {input} onChangeText={this.handleTextChange} />*/}
{/*)}*/}

/*<AddEntry/>*/
/*<FlatList*/
/*data={reviews}*/
/*renderItem={this.renderItem}*/
/*/>*/


// {reviews.map(({name, text, avatar})=>
//   <Review key={name} name={name} avatar={avatar}/>
// )}