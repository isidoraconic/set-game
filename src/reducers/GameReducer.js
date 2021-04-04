import MODES from '../actions/GameModeEnum';

export default function GameReducer (
    state = {
        gameMode: undefined,
    }, action) {
        if (action.type === MODES.EASY) {
            return {
                gameMode: MODES.EASY
            }
        } else if (action.type === MODES.MEDIUM) {
            return {
                gameMode: MODES.MEDIUM
            }
        } else if (action.type === MODES.HARD){
            return {
                gameMode: MODES.HARD
            }
        }
        return state
    }