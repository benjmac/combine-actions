const combineActions = (toAdd, finalAction, stateProp) => store => next => action => {

  if (action.type === toAdd) {

    const mergedAction = {
      type: finalAction
    }

    const state = store.getState();
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
    if (property) {
      if (Array.isArray(property)) {
        mergedAction[stateProp] = [...property, action.payload];
        store.dispatch(mergedAction)
      }
      else if (typeof property === 'object') {
        mergedAction[stateProp] = Object.assign({}, property, action.payload);
        store.dispatch(mergedAction)
      }
      else next(action);
    }
    else next(action);
  }
  else next(action);
}

export default combineActions;
