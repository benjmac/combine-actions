const combineActions = (toAdd, finalAction, stateProp) => store => next => action => {

  let property = undefined;
  if (action.type === toAdd) {

    const mergedAction = {
      type: finalAction
    }
    const state = store.getState();
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
      //protects if property exists and it's a string, number or boolean
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
