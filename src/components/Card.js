import Icon from "./Icon";
import React from 'react';
import { connect } from 'react-redux';
import '../style/Card.css';

class Card extends React.Component {

    onclick(action, index) { 
        this.props.dispatch({
            type: action,
            index: index
        })
    }

    render() {
        let isSelected = this.props.selected.includes(this.props.index)
        let icons = [];
        for(let i = 0; i < this.props.attributes.shapeCount; i++) {
            icons.push(<Icon type={this.props.attributes.shape} color={this.props.attributes.color} fill={this.props.attributes.shade}></Icon>);
        };
        
        return (
            <div className="card" onClick={() => this.onclick("SELECT", this.props.index)}>
                <div id="icon-container">
                    {icons}
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
    return {
      faceUp: state.faceUp,
      selected: state.selected,
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Card)