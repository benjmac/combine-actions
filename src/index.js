const combineActions = (toAdd, finalAction, stateProp) => store => next => action => {

  if (action.type === toAdd) {
    //check if it's an array or object? What other types would be stored on the state?
    //strings and numbers?
    //number, can't specify what type of calculation you'd want to make
    //strings just don't make sense...

    const mergedAction = {
      type: finalAction
    }
    const state = store.getState();
    //first checks if state has the initial property we are looking to update
    if (state[stateProp]) {
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
    //here it assumes that the state is nested due to a combine reducer
    //anything we could do to no waste time with this
    else {
      for (var key in state) {
        if (state[key][stateProp]) {
          if (Array.isArray(state[key][stateProp])) {
            mergedAction[stateProp] = [...state[key][stateProp], action.payload];
            store.dispatch(mergedAction)
          }
          else if (typeof state[key][stateProp] === 'object' && state[key][stateProp] !== null) {
            mergedAction[stateProp] = Object.assign({}, state[key][stateProp], action.payload);
            store.dispatch(mergedAction)
          }
          else {
            next(action);
          }

        }
      }
    }
  }
  else {
    next(action);
  }
}

export default combineActions;
