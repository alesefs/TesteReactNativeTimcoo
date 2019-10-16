'use strict';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import Mood from '../components/moodScreen';
import * as counterActions from '../actions/counterActions';
import { connect } from 'react-redux';

// @connect(state => ({
//   state: state.counter
// }))
class MoodApp extends Component {
  constructor(props) {
    super(props);
  }

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
