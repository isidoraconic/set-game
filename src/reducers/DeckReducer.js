import MODES from '../actions/GameModeEnum';

const cardColors = ["#EB96AA", "#90CDC3", "#7b5c00"];
const cardShapes = ["flower", "heart", "star"];
const cardShades = ["white", "solid", "black"];
const cardShapeCount = [1, 2, 3];

//Helper function for the isSet function, which checks if 3 attributes are all the same or all different
//We then do this for all 4 attributes in a medium and hard level, and only 3 out of the 4 attributes in easy
function validAttributeCondition(firstAttr, secondAttr, thirdAttr) {
    return (firstAttr === secondAttr && secondAttr === thirdAttr) || (firstAttr !== secondAttr && firstAttr !== thirdAttr && secondAttr !== thirdAttr);
}

//Function to check if three cards make a set
function isSet(cardOne, cardTwo, cardThree) {
    return validAttributeCondition(cardOne.shape, cardTwo.shape, cardThree.shape) && 
    validAttributeCondition(cardOne.color, cardTwo.color, cardThree.color) &&
    validAttributeCondition(cardOne.shade, cardTwo.shade, cardThree.shade) && 
    validAttributeCondition(cardOne.shapeCount, cardTwo.shapeCount, cardThree.shapeCount)
}

function findSet(currentCards) {
    for (let i = 0; i < currentCards.length; i++) {
        for (let j = i + 1; j < currentCards.length; j++) {
            for (let k = j + 1; k < currentCards.length; k++) {
                if (isSet(currentCards[i], currentCards[j], currentCards[k])) {
                    let first_card = currentCards[i]
                    let second_card = currentCards[j]
                    let third_card = currentCards[k]
                    return true
                }
                
            }
        }
    }
    return false
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
    let returnList = [...indexList]
    for (const index in indices) {
        returnList.splice(index, 1)
    }
    return returnList
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
            if (action.difficulty === MODES.MEDIUM) {
                while(!findSet(faceUp)) {
                    [faceDown, faceUp] = getNewCards(faceDown, faceUp, 3)
                }
            }
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
            return {
                faceUp: faceUpTemp,
                faceDown: faceDownTemp,
                selected: state.selected,
                numValidSets: state.numValidSets,
                gameMode: state.gameMode
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
                    numValidSets: state.numValidSets,
                    gameMode: state.gameMode
                }
            }
            if (state.selected.length == 2) {
                state.selected.push(action.index);
                let validSet = isSet(state.faceUp[action.index], state.faceUp[state.selected[0]], state.faceUp[state.selected[1]]);
                let faceUp = [...state.faceUp]
                let faceDown = [...state.faceDown]
                if (validSet) {
                    alert("Congrats, you created a valid set.")
                    faceUp = removeIndices(state.selected, faceUp);
                    let result = getNewCards(faceDown, faceUp, 3);
                    faceDown = result[0]
                    faceUp = result[1]
                    if (state.gameMode === MODES.MEDIUM) {
                        while(!findSet(faceUp)) {
                            result = getNewCards(faceDown, faceUp, 3)
                            faceDown = result[0]
                            faceUp = result[1]
                        }
                        while(faceUp < 12 && faceDown >= 3) {
                            result = getNewCards(faceDown, faceUp, 3)
                            faceDown = result[0]
                            faceUp = result[1]
                        }
                        state.numValidSets++;
                    }
                } else {
                    alert("Not a valid set.")
                }
                return {
                    faceUp: faceUp,
                    faceDown: faceDown,
                    selected: [],
                    numValidSets: state.numValidSets,
                    gameMode: state.gameMode
                }
            }
            else {
                return {
                    faceUp: state.faceUp,
                    faceDown: state.faceDown,
                    selected: state.selected.concat(action.index),
                    numValidSets: state.numValidSets,
                    gameMode: state.gameMode
                }
            }
        }
    return state;
}
