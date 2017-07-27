# redux-action-combiner

## About
Redux Action Combiner [middleware](https://github.com/reactjs/redux/blob/master/docs/advanced/Middleware.md) is meant to create a link between two pieces of state and to clean up the reducer of unnecessary cases. It also allows one to visually connect two actions, making it easier to follow the flow of the action creators / state.

Redux Action Combiner works seamlessly along side other middeware.

## Why use Redux Action Combiner?

It makes linking and updating state easier and more logical than ever before. Of course this isn't for all instances. It assumes you will be wanting to add to the same type from the original
state. For example, a new value in an array or a new key and value to an object.

Below are a few examples showing the current state type and what would need to be added.

Array Example:
```js
current state: ['foo', 'bar']
action payload: 'baz'

next state: ['foo', 'bar', 'baz']
```

Object Example:
```js
current state: { soap: 1.99, soda: 1.55, jam: 3.99 }
action payload: { milk: 2.25 }

next state: { soap: 1.99, soda: 1.55, jam: 3.99, milk: 2.25 }
```

## Installation and Setup

```
npm install --save redux-action-combiner
```

Then, to enable Redux Action Combiner, use [`applyMiddleware()`](http://redux.js.org/docs/api/applyMiddleware.html):

```js
import { createStore, applyMiddleware } from 'redux';
import combine from 'redux-action-combiner';
import rootReducer from './reducers/index';

const NEW_MESSAGE = 'NEW_MESSAGE';
const ALL_MESSAGES = 'GET_MESSAGES';
const messages = 'messages';

const addMessage = combine(NEW_MESSAGE, ALL_MESSAGES, messages);

// Note: this API requires redux@>=3.1.0
// Note: initial state needs to be an object or array, depending which type is being used
// Note: will work with nested state from combineReducers as well
const store = createStore(
  rootReducer,
  applyMiddleware(addMessage)
);
```

As seen above the middleware function needs to be invoked with the correct arguments. Then the returned function is plugged into [`applyMiddleware()`](http://redux.js.org/docs/api/applyMiddleware.html):

```NEW_MESSAGE``` is the action type that will be dispatched to the store to update the current state, which is set by ```ALL_MESSAGES```. In the reducer ```ALL_MESSAGES``` controls the state property of ```messages```. This removes the need for having ```NEW_MESSAGE``` in the reducer switch case and allows one to see the link between the two action types.

The three arguments need to be entered into the ```combine``` function in the correct order.
1. Action type that will have payload to be added
2. Action type that will have value added via the reducer
3. Property on the state that will be updated

```js
const NEW_MESSAGE = 'NEW_MESSAGE';
const ALL_MESSAGES = 'ALL_MESSAGES';
const messages = 'messages';

const addMessage = combine(NEW_MESSAGE, ALL_MESSAGES, messages);

```
From there you can plug in the returned middleware function to the store.
Feel free to use ```combineReducers```, as the nested state won't create any issues.

```js
const store = createStore(
  rootReducer,
  applyMiddleware(addMessage)
);
```

## Action Creators

Any action creator meant for a combiner function must have the correct type, which is determined when the function is created. The action creator ***MUST*** have the property called ```payload``` for it to be read by the middleware. So naming within the action creator is very important.

Below are some examples of how an actions should be created for ```redux-action-combiner```.

```js
//Note they both have the payload property!
const newMessageAction = {
  type: NEW_MESSAGE,
  payload: 'baz'
}

const newItemAction = {
  type: NEW_ITEM,
  payload: { test: 'case' }
}
```

## Additional Information

Redux Action Combiner is made to take only one linkage at a time. So for multiple links, multiple functions would need to be created from the combiner function. This is so the linkage can be more visable. Those functions can then be plugged into ```applyMiddleware```.

Requires specific initial state of an empty array or object. This depends whether one is working with adding to arrays or objects.

## License

ISC
