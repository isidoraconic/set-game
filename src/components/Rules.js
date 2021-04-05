import React from 'react';
import '../style/Rules.css';
import ValidSet1 from '../images/valid-set1.png';
import ValidSet2 from '../images/valid-set2.png';

export default class Rules extends React.Component {
    render() {

        return (
            <div className="rules-all-container">
                <div className="general-rules">
                    <h2>General Rules:</h2>
                    <div className="general-instructions">
                        The objective of the game is to identify a SET of 3 cards from 12 cards placed face up. 
                        Each card has 4 features (color, fill, shape, and number of shapes per card). The aim of the 
                        game is to create SETs of these cards, based on these features. A SET is defined as 3 cards
                        in whcih each of the cards' features, looked at one by one, are the SAME on each cards, or, 
                        are DIFFERENT on each card. All of the features must separately satisfy this rule. In other 
                        words, shape must be the same on all 3 cards, or different on each of the 3 cards, color must
                        be the same on all 3 cards, or different on each of the 3, and the same goes for each of the 
                        4 features of the cards. The game is complete when all SETs are found.
                    </div>
                </div> 
                <div className="rules-container">
                    <div className="rules" id="easy-rules">
                        <h3>Easy Level Rules</h3>
                        <div className="rules-content" id="easy-content">
                        The easy game level only uses 3 of the 4 features of each card. In this case, the number of 
                        shapes on the card will always be 1 (number of shapes is not considered when making SETs).  
                        Because of this, you only have 27 cards total, and an easy game is won when the 9 SETs are
                        found.
                        </div>
                    </div>
                    <div className="rules" id="medium-rules">
                        <h3>Medium Level Rules</h3>
                        <div className="rules-content" id="medium-content">
                        In a medium game, the game will use the normal 81 cards and all 4 features on the cards, and 
                        will automatically draw more cards if there is not an available set for the user to pick. 
                        Therefore, if there does not exist a SET within the 12 drawn cards, then 3 more cards are 
                        automatically drawn by the game (and will continue to be drawn 3 at a time automatically 
                        until a SET is possible). A medium game is won when al 27 SETs have been found.
                        </div>
                    </div>
                    <div className="rules" id="hard-rules">
                        <h3>Hard Level Rules</h3>
                        <div className="rules-content" id="hard-content">
                        In a hard game, the level uses the normal 81 cards and all 4 features on the cards when making 
                        SETs. It will NOT automatically draw cards for the player if there is not a possible SET to be
                        made from the 12 displayed cards. A hard game is won when al 27 SETs have been found.
                        </div>
                    </div>
                </div>
                <div className="photo-container">
                    <h4>Below are examples of valid sets: </h4>
                    <img src={ValidSet1} alt="Example 1 of a valid SET."/>
                    <img src={ValidSet2} alt="Example 2 of a valid SET."/>
                </div>
            </div>
        )
    }

}