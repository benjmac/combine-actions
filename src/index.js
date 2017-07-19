const combineActions = (something) => store => next => action => {
  console.log('other parameter', something);
  console.log('store parameter', store);
  next(action);
}

export default combineActions;
