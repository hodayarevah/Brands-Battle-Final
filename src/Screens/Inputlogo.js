import CharacterInput from 'react-native-character-input'
;import React, { Component } from 'react';
import { Text } from 'react-native';
class Inputlogo extends Component {
    constructor(props) {
      super(props);  
      this.state={
          guess=""
      }
    }
  
  render(){

    return (
  
        <CharacterInput
        placeHolder={Array(this.props.len.length).fill('_').join('')}
        showCharBinary={Array(this.props.len.length).fill('1').join('')}
        handleChange= {(guess) => { this.setState({guess}) }}
        inputType='contained'
        keyboardType='default'
      />


    )}}
    
  export default Inputlogo;
