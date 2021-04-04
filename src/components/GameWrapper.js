import React from 'react';
import Game from './Game';
import MODES from '../actions/GameModeEnum';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class GameWrapper extends React.Component {
  onclick(gameDifficulty) {
    this.props.dispatch({
      type: "START GAME",
      difficulty: gameDifficulty,
    })
  }

  render() {
      return (
        <div>
          <div className="game-modes"> 
            <NavLink to="/game" id="nav-game"><button onClick={()=>this.onclick(MODES.EASY)}> Easy </button></NavLink>
            <NavLink to="/game" id="nav-game"><button onClick={()=>this.onclick(MODES.MEDIUM)}> Medium </button></NavLink>
            <NavLink to="/game" id="nav-game"><button onClick={()=>this.onclick(MODES.HARD)}> Hard </button> </NavLink>
          </div>
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
    return {}
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(GameWrapper)