import { createStore, applyMiddleware } from 'redux';
import combineActions from '../src/index';


/* Action Types */
export const RESET_STATE = 'RESET_STATE';
export const TEST = 'TEST';
export const GET_MESSAGES = 'GET_MESSAGES';
export const NEW_MESSAGE = 'NEW_MESSAGE';


/* Initial State */
export const initialState = {
    test: '',
    messages: ['how are you?'],
    items: {
        soap: 1.99,
        soda: 1.55,
        jam: 3.99
    }
};

/* MiddleWare Created */

const message = combineActions(NEW_MESSAGE, GET_MESSAGES);
const test = combineActions(TEST, GET_MESSAGES);

/* Reducer Function */
const testReducer = (state = initialState, action) => {
    let newState = Object.assign({}, state);
    switch (action.type) {

        case TEST:
            newState.test = action.payload
            break;

        case RESET_STATE:
            newState = initialState;
            break;

        case GET_MESSAGES:
            newState.messages = action.messages
            break

        //Shouldn't be needed anymore
        // case NEW_MESSAGE:
        //     newState.messages = [...state.messages, action.payload]
        //     break

        default:
            return newState;
    }
    return newState;
}

//store created
const store = createStore(
    testReducer,
    applyMiddleware(message,
        test)
);

export default store;
