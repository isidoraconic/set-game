import React from 'react';
import MODES from '../actions/GameModeEnum';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import '../style/GameWrapper.css';


class GameWrapper extends React.Component {
  onclick(gameDifficulty) {
    this.props.dispatch({
      type: "START GAME",
      difficulty: gameDifficulty,
    })
  }

  render() {
      return (
        <div className="game-mode-container">
          <h2>
            Please select a game difficulty from the options below to start playing.
          </h2>
          <div id="game-mode-info">
            See the 'Rules' page for more information on how to play the game and differences between difficulty levels.
          </div>
          <div className="game-modes"> 
            <NavLink to="/game" className="nav-game" id="easy"><button onClick={()=>this.onclick(MODES.EASY)}> Easy </button></NavLink>
            <NavLink to="/game" className="nav-game" id="medium"><button onClick={()=>this.onclick(MODES.MEDIUM)}> Medium </button></NavLink>
            <NavLink to="/game" className="nav-game" id="hard"><button onClick={()=>this.onclick(MODES.HARD)}> Hard </button> </NavLink>
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