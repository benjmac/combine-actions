import { createStore, applyMiddleware } from 'redux';
import combineActions from '../src/index';


/* Action Types */
export const RESET_STATE = 'RESET_STATE';
export const GET_MESSAGES = 'GET_MESSAGES';
export const NEW_MESSAGE = 'NEW_MESSAGE';
export const GET_ITEMS = 'GET_ITEMS';
export const NEW_ITEM = 'NEW_ITEM';
export const NEW_TEST = 'NEW_TEST';
export const GET_TESTS = 'GET_TESTS';



/* Initial State */
export const initialState = {
    messages: ['how are you?'],
    items: {
        soap: 1.99,
        soda: 1.55,
        jam: 3.99
    },
    test: {
        key: ['foo', 'bar']
    }
};

/* State Properties */
//Constants created to avoid typos, like with action types
const messages = 'messages';
const items = 'items';

/* MiddleWare Created */
const addMessage = combineActions(NEW_MESSAGE, GET_MESSAGES, messages);
const addItem = combineActions(NEW_ITEM, GET_ITEMS, items);
const testNestedProps =  combineActions(NEW_TEST, GET_TESTS,'test.key')

/* Reducer Function */
const testReducer = (state = initialState, action) => {
    let newState = Object.assign({}, state);
    switch (action.type) {

        case GET_ITEMS:
            newState.items = action[items]
            break;

        case GET_MESSAGES:
            newState.messages = action[messages]
            break

        // case GET_TESTS:
        // newState.test = action.

        case RESET_STATE:
            newState = initialState;
            break;

        default:
            return newState;
    }
    return newState;
}

//store created
const store = createStore(
    testReducer,
    applyMiddleware(
        addMessage,
        addItem)
);

export default store;
