import React from 'react';
import Rules from './components/Rules';
import Home from './components/Home';
import GameWrapper from './components/GameWrapper';
import NavBar from './components/NavBar';
import Game from './components/Game';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar/>
          <Switch>
            <Route path="/game-selection" component={GameWrapper}/>
            <Route path="/game" component={Game}/>
            <Route path="/rules" component={Rules}/>
            <Route path="/" component={Home}/>
          </Switch>
        </div> 
      </BrowserRouter>
    )
  }
}