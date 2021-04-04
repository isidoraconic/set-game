//Code for this component from: https://codesandbox.io/s/blue-frog-xbnmw?fontsize=14&file=/src/index.js:0-300 
import React from "react";
import { ReactComponent as Flower } from "./svg-icons/flower.svg";
import { ReactComponent as Heart } from "./svg-icons/heart.svg";
import { ReactComponent as Star } from "./svg-icons/star.svg";

const iconTypes = {
  star: Star,
  flower: Flower,
  heart: Heart,
};

const iconStyle = (color, fill) => {return {
    height: "45px",
    width: "45px",
    strokeWidth: "45",
    stroke: color,
    fill: fill,
}}


const Icon = ({type, color, fill}) => {
  let Shape = iconTypes[type];
  return <Shape style={iconStyle(color, fill)}/>;
};

export default Icon;

