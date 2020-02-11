import React, {Component} from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
////import storage from 'redux-persist/lib/storage';
//import AsyncStorage from '@react-native-community/async-storage';

//import { persistStore, persistReducer } from 'redux-persist';

import * as reducers from '../reducers';
import MoodApp from './moodApp';

//import { PersistGate } from 'redux-persist/integration/react'

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
// };

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
//const persistedReducer = persistReducer(persistConfig, reducer);
//const store = createStoreWithMiddleware(persistedReducer);
const store = createStoreWithMiddleware(reducer);
//const persistor = persistStore(store);


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
          <MoodApp />
        {/* </PersistGate> */}
      </Provider>
    );
  }
}