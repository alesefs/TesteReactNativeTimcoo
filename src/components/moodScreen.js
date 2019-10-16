import React, {Component} from 'react';
import {
    View,
    SafeAreaView,
    Text,
    TouchableOpacity,
  } from 'react-native';
  
  import styles from './moodScreen.styles';
  import Slider from '@react-native-community/slider';
  import Emoji from 'react-native-emoji';
  import { sliderValue } from '../actions/counterActions';


  export default class Mood extends Component {
    constructor(props) {
      super(props);
    }

    /*
    componentWillMount() {
        AsyncStorage.getItem('currrentValue', (err, value) => {
            if (err) {
                console.error(err)
            } else {
                if (value) {
                    
                } else {
                    
                }
            }
        })
    }
    */
  
    render() {
        const { counter, sliderValue, saveInstance } = this.props;
        const format = value => value + '%';
        const midColorOpacity = '88';
        const lowColorOpacity = '55';
  
        return (
            <>
                <SafeAreaView style={[styles.container, {backgroundColor: counter.color[Math.floor(counter.count / 20)]+lowColorOpacity }]}>

                    {/* efeitos quadrados do background */}
                    <View style={[styles.roundRectEffect, {backgroundColor: counter.color[Math.floor(counter.count / 20)]+midColorOpacity }]}/>
                    <View style={[styles.roundRectEffect2, {backgroundColor: counter.color[Math.floor(counter.count / 20)]+midColorOpacity }]}/>

                    <Text style={styles.title}>MEU HUMOR</Text>


                    <View style={styles.centralize}>
                        {/* imagem do humor da pessoa */}
                        <View style={[styles.roundRect, {backgroundColor: counter.color[Math.floor(counter.count / 20)] }]}>
                            <Emoji name={counter.emoji[Math.floor(counter.count / 20)]} style={styles.emoji} />
                        </View>

                        {/* descritivos do humor da pessoa */}
                        <View style={styles.mood}>
                            {/* textos do humor */}
                            <Text style={styles.moodDescription}>
                                { counter.mood[Math.floor(counter.count / 20)] }
                            </Text>
                            {/* valor do slider */}
                            <Text style={styles.moodPercent}>
                                {format(counter.count)}
                            </Text>
                        </View>

                        {/* slider */}
                        <Slider
                            width={"80%"} 
                            minimumValue={counter.min}
                            maximumValue={counter.max}
                            step={counter.step}
                            value={counter.count}
                            onValueChange={val => sliderValue(val)}
                            thumbTintColor='#263238'
                            maximumTrackTintColor='#cfd8dc' 
                            minimumTrackTintColor='#263238'
                            format={format}
                        />                  
                    </View>

                    {/* botao */}
                    <TouchableOpacity onPress={() => { saveInstance(counter.count) }}>
                        <View style={styles.buttonSend}>
                            <Text style={styles.buttonSendTxt}>SALVAR</Text>
                        </View>
                    </TouchableOpacity>

                </SafeAreaView>
            </>
        );
    }
  }