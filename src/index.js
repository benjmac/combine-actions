const combineActions = (toAdd, finalAction) => store => next => action => {

  if (action.type === toAdd) {
    //check if it's an array or object? What other types would be stored on the state?
    //strings and numbers?

    const mergedAction = {
      type: finalAction
    }
    const state = store.getState();
    const prop = finalAction.split('_').slice(-1)[0].toLowerCase();

    if (Array.isArray(state[prop])) {
      mergedAction[prop] = [...state[prop], action.payload];
      store.dispatch(mergedAction)
    }
    else if (typeof state[prop] === 'object') {
      mergedAction[prop] = Object.assign({}, state[prop], action.payload);
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
