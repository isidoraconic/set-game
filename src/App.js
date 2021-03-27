import React from 'react';
import { connect } from 'react-redux';
import Deck from './components/Deck';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  onclick(action) {
    this.props.dispatch({
      type: action,
    })
  }

  render() {
    return (
      <div className="wrapper">
        {/* <button onClick={() => this.onclick("NEW CARD")}>New Card</button>
        <button onClick={() => this.onclick("CLEAR")}>Clear Cards</button>
        <Deck></Deck> */}
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
    faceUp: state.faceUp,
    faceDown: state.faceDown,
    selected: state.selected,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
