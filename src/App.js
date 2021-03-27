import React from 'react';
import Rules from './components/Rules';
import Game from './components/Game';
import NavBar from './components/NavBar';
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
            <Route path="/game" component={Game}/>
            <Route path="/rules" component={Rules}/>
          </Switch>
        </div> 
      </BrowserRouter>
    )
  }
}