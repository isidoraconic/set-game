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
    let currentHTML = (<div><button onClick={() => this.onclick("DRAW 3 CARDS")}>Draw Three Cards</button>
    <div>Number of valid sets: {this.props.numValidSets}</div>
    <div>Number of remaining cards: {this.props.faceDown.length}</div>
    <Deck></Deck>
    </div>)
    if (this.props.faceDown === 0 && this.props.numValidSets > 0) {
      currentHTML = <div> Congrats you beat the game, leave me alone. </div>
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
