import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import DeckReducer from './reducers/DeckReducer';

//const reducers = combineReducers({game: GameReducer, deck:DeckReducer})

const store = createStore(DeckReducer);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>, document.getElementById('root'));
