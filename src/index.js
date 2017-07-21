const combineActions = (toAdd, finalAction) => store => next => action => {

  //I need to get the state that specific action is looking to upate
  //add it to the state of the other one, which has a different name,
  //access the propert name I don't know...
  //access the name I don't know on the state...

  if (action.type === toAdd) {
    //check if it's an array or object? What other types would be stored on the state?
    //strings and numbers?


    const state = store.getState();
    const prop = finalAction.split('_').slice(-1)[0].toLowerCase();
    if (Array.isArray(state[prop])) {
      //key is naming the finalActions last part or name the plural version on what's being added
      const mergedAction = {
        type: finalAction,
        [prop]: [...state[prop], action.payload]
      }
      store.dispatch(mergedAction)
    }
    else if (typeof state[prop] === 'object') {
      //add a key to the object
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
