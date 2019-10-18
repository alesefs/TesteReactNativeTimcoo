import * as types from '../actions/actionTypes';
//import {AsyncStorage} from "react-native";

const initialState = {
  count: 50,
  min: 0,
  max: 100,
  step: 1,
  colors: ["#ef9a9a", "#ffccbc", "#fff59d", "#c8e6c9", "#81d4fa", "#81d4fa"],
  moods: ["Muito Triste", "Triste", "Normal", "Feliz", "Muito Feliz", "Muito Feliz"],
  emojis: ["sob", "disappointed", "neutral_face", "blush", "grin", "grin"],
};


export default function counter(state = initialState, action = {}) {
  switch (action.type) {
    case types.SLIDER_VALUE:
      return {
        ...state,
        count: action.value,
      };
    case types.SAVE_INSTANCE:
      //const saveInstanceCount = await AsyncStorage.getItem('saveInstanceCount', '')
      //console.log('saveInstanceCount: '+saveInstanceCount)
      //state.count = saveInstanceCount;
      return { ...state }
    default:
      return state;
  }
}

