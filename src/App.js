/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';

import styles from './App.styles';

import Slider from '@react-native-community/slider';
import Emoji from 'react-native-emoji';
import AsyncStorage from '@react-native-community/async-storage';


export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
        currrentValue: 50,
        minCurrrentValue: 0,
        maxCurrrentValue: 100,
        mood: ["Muito Triste", "Triste", "Normal", "Feliz", "Muito Feliz"],
        emoji: ["sob", "disappointed", "neutral_face", "blush", "grin"],
        backgroundColor: this.colorBackground(0),
    }
  }

  componentDidMount = () => {       
    AsyncStorage.getItem('currrentValue', (err, value) => {
        if (err) {
            console.error(err)
        } else {
            if (value) {
              this.setState({ 
                currrentValue: parseInt(JSON.parse(value), 10),
                backgroundColor: this.colorBackground(Math.round(parseInt(JSON.parse(value), 10)/25)),
              });
            } else {
              value = 50;
              this.setState({ 
                currrentValue: value,
                backgroundColor: this.colorBackground(value/25),
              });
            }
        }
    })
  }

  setcurrrentValue = (value) => {
    AsyncStorage.setItem('currrentValue', JSON.stringify(value))
    this.setState({ 
      currrentValue: value,
    });
  }

  render() {

    return (
      <>
        <SafeAreaView style={[styles.container, {backgroundColor: this.state.backgroundColor+55}]}>

          {/* efeitos quadrados do background */}
          <View style={[styles.roundRectEffect, {backgroundColor: this.state.backgroundColor+88}]}/>
          <View style={[styles.roundRectEffect2, {backgroundColor: this.state.backgroundColor+88}]}/>

          <Text style={styles.title}>MEU HUMOR</Text>

          <View style={styles.centralize}>
            {/* imagem do humor da pessoa */}
            <View style={[styles.roundRect, {backgroundColor: this.state.backgroundColor}]}>
              { this.displayImage() }
            </View>

            {/* descritivos do humor da pessoa */}
            <View style={styles.mood}>
              {/* textos do humor */}
              <Text style={styles.moodDescription}>
                { this.displayMessage() }
              </Text>
              {/* valor do slider */}
              <Text style={styles.moodPercent}>
                {Math.round(this.state.currrentValue)} %
              </Text>
            </View>

            {/* slider */}
            <Slider
                style={{width:"80%"}} 
                minimumValue={this.state.minCurrrentValue}
                maximumValue={this.state.maxCurrrentValue}
                value={this.state.currrentValue}
                step={1}
                onValueChange={val => this.setState({ 
                  currrentValue: val,
                  backgroundColor: this.colorBackground(Math.round(val/25)),
                })}
                thumbTintColor='#263238'
                maximumTrackTintColor='#cfd8dc' 
                minimumTrackTintColor='#263238'
              /> 
          </View>
          
          {/* botao */}
          <TouchableOpacity onPress = {() => { this.setcurrrentValue(Math.round(this.state.currrentValue)) }}>
              <View style={styles.buttonSend}>
                  <Text style={styles.buttonSendTxt}>SALVAR</Text>
              </View>
          </TouchableOpacity>
      
        </SafeAreaView>
      </>
    );
  }

  //cores do background
  colorBackground = (value) => {
    let colors = ["#ef9a9a", "#ffccbc", "#fff59d", "#c8e6c9", "#81d4fa"];
    return colors[value];
  }

  //emojis de humor
  displayImage = () => {
    return <Emoji name={this.state.emoji[Math.round(this.state.currrentValue/25)]} style={styles.emoji} />;
  }

  //texto do humor
  displayMessage = () => {
    return `${(this.state.mood[Math.round(this.state.currrentValue/25)]).toLocaleUpperCase()}`;
  }

};
