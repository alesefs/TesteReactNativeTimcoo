import React from 'react';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    roundRectEffect: {
        width: "100%",
        height: 400,
        borderRadius: 50,
        top: "-10%",
        left: -150,
        position: "absolute",
    },
    roundRectEffect2: {
        width: "100%",
        height: 400,
        borderRadius: 50,
        top: "60%",
        right: -150,
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