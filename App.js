/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';

import Slider from '@react-native-community/slider';
import Emoji from 'react-native-emoji';
import AsyncStorage from '@react-native-community/async-storage';

let colorBackground = (value) => {
  let colors = ["#ef9a9a", "#ffccbc", "#fff59d", "#c8e6c9", "#81d4fa"];
  return colors[value];
}

export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
        distance: 50,
        minDistance: 0,
        maxDistance: 100,
        mood: ["Muito Triste", "Triste", "Normal", "Feliz", "Muito Feliz"],
        emoji: ["sob", "disappointed", "neutral_face", "blush", "grin"],
        backgroundColor: colorBackground(0),
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
                backgroundColor: colorBackground(Math.round(parseInt(JSON.parse(value), 10)/25)),
              });
            } else {
              value = 50;
              this.setState({ 
                distance: value,
                backgroundColor: colorBackground(value/25),
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
                  backgroundColor: colorBackground(Math.round(val/25)),
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

  displayImage = () => {
    return <Emoji name={this.state.emoji[Math.round(this.state.distance/25)]} style={styles.emoji} />;
  }

  displayMessage = () => {
    return `${(this.state.mood[Math.round(this.state.distance/25)]).toLocaleUpperCase()}`;
  }


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  roundRectEffect: {
    width: "100%",
    height: 400,
    borderRadius: 50,
    top: -25,
    left: -150,
    position: "absolute",
  },
  centralize: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  title: {
    textAlign: 'center',
    marginVertical: 30,
    fontSize: 20,
    color: "#263238"
  },
  roundRect: {
    width: 150,
    height: 150,
    borderRadius: 25,
    top: -100,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff88',
  },
  emoji: {
    fontSize: 100, 
  },
  mood: {
    marginHorizontal: "10%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    top: -50,
  },
  moodDescription: {
    fontSize: 24,
    color: "#263238",
    width: "70%",
    textAlign: 'left'
  },
  moodPercent: {
    fontSize: 24,
    color: "#263238",
    width: "30%",
    textAlign: 'right'
  },
  buttonSend: {
    backgroundColor: '#263238', 
    alignItems: 'center', 
    justifyContent: 'center',
    height: 60,
  },
  buttonSendTxt: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
});
