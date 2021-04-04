import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import DeckReducer from './reducers/DeckReducer';
import GameReducer from './reducers/GameReducer';

const reducers = combineReducers({game: GameReducer, deck:DeckReducer})

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>, document.getElementById('root'));
