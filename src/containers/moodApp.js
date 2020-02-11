'use strict';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import Mood from '../components/moodScreen';
import * as counterActions from '../actions/counterActions';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';


class MoodApp extends Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount = () => {
  //   AsyncStorage.getItem('users', (err, value) => {
  //     if (err) {
  //         console.error(err)
  //     } else {
  //         if (value !== null) {
  //           this.setState({ 
  //             currrentValue: parseInt(value, 10),
  //           });

  //           this.props.state.count = this.state.currrentValue;
  //           console.log("valueINSIDE", this.props.state.count);

  //         }
  //     }
  //   })
  // }

  render() {
    const { state, actions } = this.props;

    return (
      <Mood
        counter={{
          count: state.count,
          min: state.min,
          max: state.max,
          step: state.step,
          color: state.colors,
          mood: state.moods,
          emoji: state.emojis,
        }}
        {...actions} />
    );
  }
}


export default connect(state => ({
    state: state.counter
  }),
  (dispatch) => ({
    actions: bindActionCreators(counterActions, dispatch)
  })
)(MoodApp);
