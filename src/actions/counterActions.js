import * as types from './actionTypes';

export function sliderValue(value) {
  return {
    type: types.SLIDER_VALUE,
    value: value
  };
}

export function saveInstance(value) {
  return {
    type: types.SAVE_INSTANCE,
    value: value
  };
}
