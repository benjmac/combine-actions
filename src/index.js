import { GET_MESSAGES, NEW_MESSAGE } from '../test/store.js'

const combineActions = (mergeAction, finalAction) => store => next => action => {

  //I need to get the state that specific action is looking to upate
  //add it to the state of the other one, which has a different name,
  //access the propert name I don't know...
  //access the name I don't know on the state...

  if (action.type === mergeAction) {
    let name = action.type.split('_')
    console.log(name);
    let state = store.getState();
    let action = {
      type: finalAction,
      payload: [ state.something, action.payload ]
    }
  }
  else {
    next(action);
  }
}

export default combineActions;
