import * as types from '../actions/actionTypes';
import AsyncStorage from '@react-native-community/async-storage';


const initialState = {
  count: 50,
  min: 0,
  max: 100,
  step: 1,
  colors: ["#ef9a9a", "#ffccbc", "#fff59d", "#c8e6c9", "#81d4fa", "#81d4fa"],
  moods: ["Muito Triste", "Triste", "Normal", "Feliz", "Muito Feliz", "Muito Feliz"],
  emojis: ["sob", "disappointed", "neutral_face", "blush", "grin", "grin"],
};

async function storeData (value) {
  try {
    await AsyncStorage.setItem('users', JSON.stringify(value));
    console.log("@storeData:count", value);
  } catch (e) {
    console.error(e);
  }
};


async function retriveData() {
  await AsyncStorage.getItem('users', (err, value) => {
    if (err) {
        console.error(err)
    } else {
        if (value !== null) {
          console.log("valueINSIDE", parseInt(value, 10));
          return parseInt(value, 10);
        } else {
          return 50;
        }
    }
  })
}


export default function counter(state = initialState, action = {}) {
  
  switch (action.type) {
    case types.SLIDER_VALUE:
      return {
        ...state,
        count: action.value,
      };
    
    case types.SAVE_INSTANCE:
      storeData(action.value);
      return {
        ...state,
        count: action.value,
      }
    default:
      return state;
  }
}

