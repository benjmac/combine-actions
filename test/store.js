import { createStore, applyMiddleware } from 'redux';
import combineActions from '../src/index';

let test = combineActions('HELLO WORLD');

/* Action Types */
export const RESET_STATE = 'RESET_STATE';
export const TEST = 'TEST';
export const GET_MESSAGES = 'GET_MESSAGES';
export const NEW_MESSAGE = 'NEW_MESSAGE';

/* Action Creators */


/* Initial State */
export const initialState = {
  test: '',
  messages: [],
};

/* Reducer Function */
const testReducer = (state = initialState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {

    case TEST:
        newState.test = action.data
        break;

    case RESET_STATE:
        newState = initialState;
        break;

    case GET_MESSAGES:
      return action.messages;

    case NEW_MESSAGE:
      return [...state.messages, action.message];

    default:
        return newState;
  }
  return newState;
}

//store created
const store = createStore(
  testReducer,
  applyMiddleware(test)
);

export default store;
