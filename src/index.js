const combineActions = (toAdd, finalAction, stateProp) => store => next => action => {

  if (action.type === toAdd) {
    //check if it's an array or object? What other types would be stored on the state?
    //strings and numbers?

    const mergedAction = {
      type: finalAction
    }
    const state = store.getState();

    if (Array.isArray(state[stateProp])) {
      mergedAction[stateProp] = [...state[stateProp], action.payload];
      store.dispatch(mergedAction)
    }
    //have a not null test here
    //as if we're updating an object, should have initial state of empty obj?
    else if (typeof state[stateProp] === 'object' && state[stateProp] !== null) {
      mergedAction[stateProp] = Object.assign({}, state[stateProp], action.payload);
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
