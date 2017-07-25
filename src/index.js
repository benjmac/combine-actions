const combineActions = (toAdd, finalAction, stateProp) => store => next => action => {

  //tests, think how I can break this...
  //if the property isn't found?
  if (action.type === toAdd) {

    const mergedAction = {
      type: finalAction
    }
    const state = store.getState();
    //first checks if state has the initial property we are looking to update
    let property = undefined;
    if (state[stateProp]) {
      property = state[stateProp];
    }
    else {
      for (let key in state) {
        if (state[key][stateProp]) {
          property = state[key][stateProp];
          break;
        }
      }
    }
    if (property && Array.isArray(property)) {
      mergedAction[stateProp] = [...property, action.payload];
      store.dispatch(mergedAction)
    }
    //have a not null test here
    //as if we're updating an object, should have initial state of empty obj?
    else if (property && typeof property === 'object' && property !== null) {
      mergedAction[stateProp] = Object.assign({}, property, action.payload);
      store.dispatch(mergedAction)
    }
    else {
      next(action);
    }
  }
  else {
    next(action);
  }
}

export default combineActions;
