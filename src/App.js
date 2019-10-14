/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  //StyleSheet,
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
        distance: 50,
        minDistance: 0,
        maxDistance: 100,
        mood: ["Muito Triste", "Triste", "Normal", "Feliz", "Muito Feliz"],
        emoji: ["sob", "disappointed", "neutral_face", "blush", "grin"],
        backgroundColor: this.colorBackground(0),
    }
  }

  componentDidMount = () => {
            
    AsyncStorage.getItem('distance', (err, value) => {
        if (err) {
            console.error(err)
        } else {
            if (value) {
              this.setState({ 
                distance: parseInt(JSON.parse(value), 10),
                backgroundColor: this.colorBackground(Math.round(parseInt(JSON.parse(value), 10)/25)),
              });
            } else {
              value = 50;
              this.setState({ 
                distance: value,
                backgroundColor: this.colorBackground(value/25),
              });
            }
        }
    })
  }

  setDistance = (value) => {
    AsyncStorage.setItem('distance', JSON.stringify(value))
    this.setState({ 
      distance: value,
    });
  }

  render() {

    return (
      <>
        <SafeAreaView style={[styles.container, {backgroundColor: this.state.backgroundColor+55}]}>

          <View style={[styles.roundRectEffect, {backgroundColor: this.state.backgroundColor+88}]}/>

          <View style={[styles.roundRectEffect2, {backgroundColor: this.state.backgroundColor+88}]}/>

          <Text style={styles.title}>MEU HUMOR</Text>

          <View style={styles.centralize}>
            <View style={[styles.roundRect, {backgroundColor: this.state.backgroundColor}]}>
              { this.displayImage() }
            </View>

            <View style={styles.mood}>
              <Text style={styles.moodDescription}>
                { this.displayMessage() }
              </Text>
              <Text style={styles.moodPercent}>
                {Math.round(this.state.distance)} %
              </Text>
            </View>

            <Slider
                style={{width:"80%"}} 
                minimumValue={this.state.minDistance}
                maximumValue={this.state.maxDistance}
                value={this.state.distance}
                //step={1}
                onValueChange={val => this.setState({ 
                  distance: val,
                  backgroundColor: this.colorBackground(Math.round(val/25)),
                })}
                thumbTintColor='#263238'
                maximumTrackTintColor='#cfd8dc' 
                minimumTrackTintColor='#263238'
              /> 
          </View>
          
          <TouchableOpacity onPress = {() => { this.setDistance(Math.round(this.state.distance)) }}>
              <View style={styles.buttonSend}>
                  <Text style={styles.buttonSendTxt}>SALVAR</Text>
              </View>
          </TouchableOpacity>
      
        </SafeAreaView>
      </>
    );
  }

  colorBackground = (value) => {
    let colors = ["#ef9a9a", "#ffccbc", "#fff59d", "#c8e6c9", "#81d4fa"];
    return colors[value];
  }

  displayImage = () => {
    return <Emoji name={this.state.emoji[Math.round(this.state.distance/25)]} style={styles.emoji} />;
  }

  displayMessage = () => {
    return `${(this.state.mood[Math.round(this.state.distance/25)]).toLocaleUpperCase()}`;
  }

};
