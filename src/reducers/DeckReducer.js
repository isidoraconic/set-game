import MODES from '../actions/GameModeEnum';

const cardColors = ["#EB96AA", "#90CDC3", "#7b5c00"];
const cardShapes = ["flower", "heart", "star"];
const cardShades = ["white", "solid", "black"];
const cardShapeCount = [1, 2, 3];
const defaultDeck = generateDeck();

//Helper function for the isSet function, which checks if 3 attributes are all the same or all different
//We then do this for all 4 attributes in a medium and hard level, and only 3 out of the 4 attributes in easy
function validAttributeCondition(firstAttr, secondAttr, thirdAttr) {
    return (firstAttr === secondAttr && secondAttr === thirdAttr) || (firstAttr !== secondAttr && secondAttr !== thirdAttr);
}

//Function to check if three cards make a set
function isSet(cardOne, cardTwo, cardThree) {
    return validAttributeCondition(cardOne.shape, cardTwo.shape, cardThree.shape) && 
    validAttributeCondition(cardOne.color, cardTwo.color, cardThree.color) &&
    validAttributeCondition(cardOne.shade, cardTwo.shade, cardThree.shade) && 
    validAttributeCondition(cardOne.shapeCount, cardTwo.shapeCount, cardThree.shapeCount)
}

// This method is from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array 
//Randomly shuffles an array--we shuffle the arrays that hold cards such that when we flip 3 new cards off the top, they are random
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function removeIndices(indices, indexList) {
    for (const index in indices) {
        indexList.splice(index, 1)
    }
    return indexList
}

function getNewCards(faceDown, faceUp, numCards) {
    if (faceDown.length === 0) {
        return [faceDown, faceUp]
    }
    let returnFaceDown = [...faceDown]
    let returnFaceUp = [...faceUp]
    for (let i = 0; i < numCards; i++) {
        returnFaceUp = returnFaceUp.concat(returnFaceDown[i])
    }
    returnFaceDown.splice(0, numCards)
    return [returnFaceDown, returnFaceUp]
}

export default function DeckReducer (
    state = {
        faceUp: [],
        faceDown: [],
        selected: [],
        numValidSets: 0,
        gameMode: null,
    }, action) {
        // This is the start of the game.
        if (action.type === "START GAME") {
            let [faceDown, faceUp]= getNewCards(generateDeck(action.difficulty), [], 12)
            console.log(faceDown.length)

            return {
                faceUp: faceUp,
                faceDown: faceDown,
                selected: [],
                numValidSets: 0,
                gameMode: action.difficulty
            }
        }
        if(action.type === "DRAW 3 CARDS") {
            let [faceDownTemp, faceUpTemp] = getNewCards(state.faceDown, state.faceUp, 3)
            console.log(faceDownTemp.length)
            return {
                faceUp: faceUpTemp,
                faceDown: faceDownTemp,
                selected: state.selected,
                numValidSets: state.numValidSets,
            }

        } 
        if (action.type === "CLEAR") {
            return {
                faceUp: [],
                faceDown: defaultDeck,
                selected: [],
                numValidSets: 0
            }
        } 
        if (action.type === "SELECT") {
            let newSelected = []
            if (state.selected.includes(action.index)) {
                newSelected = [...state.selected]
                let elementIndex = state.selected.indexOf(action.index)
                newSelected.splice(elementIndex, 1)
                return {
                    faceUp: state.faceUp,
                    faceDown: state.faceDown,
                    selected: newSelected,
                    numValidSets: state.numValidSets
                }
            }
            if (state.selected.length == 2) {
                state.selected.push(action.index);
                let validSet = isSet(state.faceUp[action.index], state.faceUp[state.selected[0]], state.faceUp[state.selected[1]]);
                if (validSet) {
                    alert("Congrats, you created a valid set.")
                    state.faceUp = removeIndices(state.selected, state.faceUp);
                    [state.faceDown, state.faceUp] = getNewCards(state.faceDown, state.faceUp, 3);
                    state.numValidSets++;
                } else {
                    alert("Not a valid set.")
                }
                return {
                    faceUp: state.faceUp,
                    faceDown: state.faceDown,
                    selected: [],
                    numValidSets: state.numValidSets
                }
            } else {
                let newSelected = state.selected.concat(action.index)
                return {
                    faceUp: state.faceUp,
                    faceDown: state.faceDown,
                    selected: newSelected,
                    numValidSets: state.numValidSets,
                }
            }
        } 
        else {
            return state;
        }
    } 

    //Function that generates an 81 card deck with each of the 4 attributes 
    function generateDeck(difficulty) {
        let deck = [];

        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                for(let h = 0; h < 3; h++) {
                    if (difficulty === MODES.EASY) {
                        let card = {
                            color: cardColors[i],
                            shape: cardShapes[j],
                            shade: cardShades[h],
                            shapeCount: 1,
                        }
                        deck.push(card);
                    } else {
                        for(let k = 0; k < 3; k++) {
                            let card = {
                                color: cardColors[i],
                                shape: cardShapes[j],
                                shade: cardShades[h],
                                shapeCount: cardShapeCount[k],
                            }
                            deck.push(card);
                        }
                    }
                }
            }
        }
        shuffleArray(deck)
        return deck;
    }
