import Icon from "./Icon";
import React from 'react';
import { connect } from 'react-redux';
import '../style/Card.css';

const shades = ["rbga(235,150,170,0.4)", "rgba(144,205,195,0.4)", "rbga(207,221,142,0.4)"];

class Card extends React.Component {

    onclick(action, index) { 
        this.props.dispatch({
            type: action,
            index: index
        })
    }

    render() {
        
        let icons = [];

        for(let i = 0; i < this.props.attributes.shapeCount; i++) {
            
            //Need to check what kind of "fill" the icon has; if it is solid, need to pass in the same colour as the outline, etc.
            if(this.props.attributes.shade === "solid") {
                icons.push(<Icon type={this.props.attributes.shape} color={this.props.attributes.color} fill={this.props.attributes.color}></Icon>);
            } else if(this.props.attributes.shade === "opaque") {
                if(this.props.attributes.color === "#EB96AA") {
                    icons.push(<Icon type={this.props.attributes.shape} color={this.props.attributes.color} fill="#F8DDE3"></Icon>);
                } else if(this.props.attributes.color === "#90CDC3") {
                    icons.push(<Icon type={this.props.attributes.shape} color={this.props.attributes.color} fill={shades[1]}></Icon>);
                } else {
                    icons.push(<Icon type={this.props.attributes.shape} color={this.props.attributes.color} fill="#EBF1D0"></Icon>);
                }
            } else {
                icons.push(<Icon type={this.props.attributes.shape} color={this.props.attributes.color} fill={this.props.attributes.shade}></Icon>);
            }


        };
        
        return (
            <div className="card" id={this.props.isSelected ? "selected" : "not"} onClick={() => this.onclick("SELECT", this.props.index)}>
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
  //TODO: is this necessary??
  let mapStateToProps = function(state, props) {
    return {}
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Card)