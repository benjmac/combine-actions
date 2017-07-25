import { createStore, applyMiddleware, combineReducers } from 'redux';
import combine from '../src/index';


/* Action Types */
export const RESET_STATE = 'RESET_STATE';
export const GET_MESSAGES = 'GET_MESSAGES';
export const NEW_MESSAGE = 'NEW_MESSAGE';
export const GET_ITEMS = 'GET_ITEMS';
export const NEW_ITEM = 'NEW_ITEM';
export const NEW_TEST = 'NEW_TEST';
export const GET_TEST = 'GET_TEST';


/* Initial State */
export const initialState = {
    messages: ['how are you?'],
    items: {
        soap: 1.99,
        soda: 1.55,
        jam: 3.99
    },
    test: null
};

/* State Properties */
//Constants created to avoid typos, like with action types
const messages = 'messages';
const items = 'items';
const test = 'test';

/* MiddleWare Created */
const addMessage = combine(NEW_MESSAGE, GET_MESSAGES, messages);
const addItem = combine(NEW_ITEM, GET_ITEMS, items);
const nullTest = combine(NEW_TEST, GET_TEST, test);

/* Reducer Function */
const reducer = (state = initialState, action) => {
    let newState = Object.assign({}, state);
    switch (action.type) {

        case GET_ITEMS:
            newState.items = action[items]
            break;

        case GET_MESSAGES:
            newState.messages = action[messages]
            break

        case GET_TEST:
            newState.test = action[test]
            break

        case RESET_STATE:
            newState = initialState;
            break;

        default:
            return newState;
    }
    return newState;
}

//store created
const store = createStore(reducer,
    applyMiddleware(
        addMessage,
        addItem,
        nullTest)
);

//store with nested state created
export const storeWithNestedState = createStore(
    combineReducers({ reducer }),
    applyMiddleware(
        addMessage,
        addItem,
        nullTest)
);

export default store;
