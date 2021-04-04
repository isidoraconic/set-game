import React from 'react';
import { connect } from 'react-redux';
import Deck from './Deck';
import MODES from '../actions/GameModeEnum'
import '../style/Game.css';

class Game extends React.Component {

  constructor(props) {
    super(props);
  }

  onclick(action) {
    this.props.dispatch({
      type: action,
    })
  }

  render() {
    let currentHTML = (
    <div className="game-container">
      <h1 className="level">Playing {this.props.gameMode} level game!</h1>
      <button className="draw-button" onClick={() => this.onclick("DRAW 3 CARDS")}>Draw Three Cards</button>
      <div className="counters-container">
        <div className="set-counter">Number of valid sets: {this.props.numValidSets}</div>
        <div className="card-counter">Number of remaining cards: {this.props.faceDown.length}</div>
      </div>
      <Deck></Deck>
    </div>
    )
    if (this.props.faceDown === 0 && this.props.numValidSets > 0) {
      currentHTML = <div className="win-message"> 
        Congrats you won the game! Select from the menu options to play another game or
        go back home. :) 
      </div>
    }
    return (
      <div className="wrapper">
        {currentHTML}
      </div>
    )
  }

}

let mapDispatchToProps = function(dispatch, props) {
  return {
      dispatch: dispatch,
  }
}

let mapStateToProps = function(state, props) {
    return {
        gameMode: state.gameMode,
        faceUp: state.faceUp,
        faceDown: state.faceDown,
        selected: state.selected,
        numValidSets: state.numValidSets
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
