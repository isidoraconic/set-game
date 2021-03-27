import React from 'react';
import { NavLink } from 'react-router-dom';

export default class NavBar extends React.Component {
    render() {
        return (
            <div className="deck"> 
                <NavLink to="/game"><button>Play Game!</button></NavLink>
                <NavLink to="/rules"><button>Rules</button></NavLink>
            </div>
        )
    }

}