import React from 'react';
import Icon from "./Icon";
import Card from "./Card";
import { connect } from 'react-redux';
import '../style/Deck.css';

class Deck extends React.Component {
    render() {
        let renderedCards = this.props.faceUp.map((item, index) => {
            let isSelected = this.props.selected.includes(index)
            return <Card attributes={item} index={index} isSelected={isSelected}></Card>
        });
        
        return (
            <div className="deck"> 
                {renderedCards}
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
  )(Deck)