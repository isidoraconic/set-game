import React from 'react';
import { connect } from 'react-redux';
import Deck from './Deck';
import MODES from '../actions/GameModeEnum'

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

    let drawAction = this.props.mode + "/DRAW";
    let clearAction = this.props.mode + "/CLEAR";
    return (
      <div className="wrapper">
        <button onClick={() => this.onclick("CLEAR")}>Clear</button>
        <button onClick={() => this.onclick("DRAW 3 CARDS")}>Draw 3 Cards</button>
        <div>Number of valid sets: {this.props.numValidSets}</div>
        <div>Number of remaining cards: {this.props.faceDown.length}</div>
        <Deck></Deck>
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

    let modeState = {
        mode: state.game.gameMode
    }

    // switch(state.game.gameMode) {
    //     case MODES.EASY:
    //         modeState.faceUp = state.easy.faceUp;
    //         modeState.faceDown = state.easy.faceDown;
    //         modeState.selected = state.easy.selected;
    //         modeState.numValidSets = state.easy.numValidSets;
    //     case MODES.MEDIUM:
    //         modeState.faceUp = state.medium.faceUp;
    //         modeState.faceDown = state.medium.faceDown;
    //         modeState.selected = state.medium.selected;
    //     case MODES.HARD:
    //         modeState.faceup = state.hard.faceUp;
    //         modeState.faceDown = state.hard.
    // }

    return {
        mode: state.game.gameMode,
        faceUp: state.deck.faceUp,
        faceDown: state.deck.faceDown,
        selected: state.deck.selected,
        numValidSets: state.deck.numValidSets
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
