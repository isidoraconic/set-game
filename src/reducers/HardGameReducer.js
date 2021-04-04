const cardColors = ["yellow", "blue", "red"];
const cardShapes = ["flower", "heart", "star"];
const cardShades = ["white", "orange", "purple"];
const cardShapeCount = [1, 2, 3];
const defaultDeck = generateDeck();

function validAttributeCondition(firstAttr, secondAttr, thirdAttr) {
    return (firstAttr === secondAttr && secondAttr === thirdAttr) || (firstAttr !== secondAttr && secondAttr !== thirdAttr);
}

function isSet(cardOne, cardTwo, cardThree) {
    return validAttributeCondition(cardOne.shape, cardTwo.shape, cardThree.shape) && 
    validAttributeCondition(cardOne.color, cardTwo.color, cardThree.color) &&
    validAttributeCondition(cardOne.shade, cardTwo.shade, cardThree.shade) && 
    validAttributeCondition(cardOne.shapeCount, cardTwo.shapeCount, cardThree.shapeCount)
}

/* This method is from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array */
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

function getNewCards(faceDown, faceUp) {
    let returnFaceUp = faceUp.concat(faceDown[0])
    returnFaceUp = returnFaceUp.concat(faceDown[1])
    returnFaceUp = returnFaceUp.concat(faceDown[2])
    faceDown.splice(0, 3)
    return [faceDown, returnFaceUp]
}

export default function DeckReducer (
    state = {
        faceUp: [],
        faceDown: defaultDeck,
        selected: [],
        numValidSets: 0,
    }, action) {
        if(action.type === "NEW CARD") {
            let [faceDownTemp, faceUpTemp] = getNewCards(state.faceDown, state.faceUp)
            return {
                faceUp: faceUpTemp,
                faceDown: faceDownTemp,
                selected: state.selected,
                numValidSets: state.numValidSets,
            }

        } else if (action.type === "CLEAR") {
            return {
                faceUp: [],
                faceDown: defaultDeck,
                selected: [],
                numValidSets: 0
            }
        } else if (action.type === "SELECT") {
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
                    [state.faceDown, state.faceUp] = getNewCards(state.faceDown, state.faceUp);
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

    function generateDeck() {
        let deck = [];
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                for(let h = 0; h < 3; h++) {
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
        shuffleArray(deck)
        return deck;
    }