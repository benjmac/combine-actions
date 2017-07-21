import { NEW_MESSAGE, GET_MESSAGES } from '../test/store.js'

const combineActions = (toAdd, finalAction) => store => next => action => {

  //I need to get the state that specific action is looking to upate
  //add it to the state of the other one, which has a different name,
  //access the propert name I don't know...
  //access the name I don't know on the state...

  if (action.type === toAdd) {

    console.log('action type inside...', action.type);
    let name = action.type.split('_').splice(-1)[0].toLowerCase();
    console.log('test action type', name)
    // const mergedAction = {
    //   type: finalAction,
    //   payload: [ state.something, action.payload ]
    // }
    // store.dispatch(mergedAction)
    next(action);
  }
  else {
    next(action);
  }
}

export default combineActions;
