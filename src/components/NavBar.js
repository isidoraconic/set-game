import React from 'react';
import { NavLink } from 'react-router-dom';
import '../style/NavBar.css';

export default class NavBar extends React.Component {
    render() {
        return (
            <div className="navbar"> 
                <NavLink to="/game-selection" id="nav-game"><button>Play Game!</button></NavLink>
                <NavLink to="/rules" id="nav-rules"><button>Rules</button></NavLink>
            </div>
        )
    }

}