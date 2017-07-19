import { createStore, applyMiddleware } from 'redux';
import combineActions from '../src/index';

let test = combineActions('HELLO WORLD');

/* Action Types */
export const RESET_STATE = 'RESET_STATE';
export const TEST = 'TEST';

/* Action Creators */


/* Initial State */
export const initialState = {
  test: '',
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
