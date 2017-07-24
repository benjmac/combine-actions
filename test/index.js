import store, { RESET_STATE, NEW_MESSAGE, NEW_ITEM, NEW_TEST } from './store.js';
import combineActions from '../src/index.js';
import chai from 'chai';
const assert = chai.assert;
const expect = chai.expect;

describe('combine-actions', () => {

  //when using, action creator must have "payload" property name
  const createAction = (type, payload) => {
    return {
      type,
      payload,
    }
  }

  describe('Adding a new message to an Array of messages', () => {

    afterEach('set store to initial state', () => store.dispatch(createAction(RESET_STATE)));

    xit('dispatches action to update state', () => {
      const desiredState = {
        messages: ['how are you?', 'New Message'],
        items: {
          soap: 1.99,
          soda: 1.55,
          jam: 3.99
        },
        test: {
          key: ['foo', 'bar']
        }
      };
      //send whatever you want to add to the existing array
      store.dispatch(createAction(NEW_MESSAGE, 'New Message'));
      assert.deepEqual(store.getState(), desiredState);
    });
  });

  describe('Adding new item to an Object of items', () => {

    afterEach('set store to initial state', () => store.dispatch(createAction(RESET_STATE)));

    xit('dispatches action to update state', () => {
      const desiredState = {
        messages: ['how are you?'],
        items: {
          soap: 1.99,
          soda: 1.55,
          jam: 3.99,
          candy: 1.25
        },
        test: {
          key: ['foo', 'bar']
        }
      };
      //send object of what you want to add to the existing object
      store.dispatch(createAction(NEW_ITEM, { candy: 1.25 }));
      assert.deepEqual(store.getState(), desiredState);
    });

    xit('dispatches two actions to update state', () => {
      const desiredState = {
        messages: ['how are you?'],
        items: {
          soap: 1.99,
          soda: 1.55,
          jam: 3.99,
          juice: 1.05,
          cheese: 3.56
        },
        test: {
          key: ['foo', 'bar', 'baz']
        }
      };
      //send object of what you want to add to the existing object
      store.dispatch(createAction(NEW_TEST, 'baz'));
      assert.deepEqual(store.getState(), desiredState);
    });

    it('nested items on state, like with combineReducer', () => {
      const desiredState = {
        messages: ['how are you?'],
        items: {
          soap: 1.99,
          soda: 1.55,
          jam: 3.99,
          juice: 1.05,
          cheese: 3.56
        },
        test: {
          key: ['foo', 'bar']
        }
      };
      //send object of what you want to add to the existing object
      store.dispatch(createAction(NEW_ITEM, { juice: 1.05 }));
      store.dispatch(createAction(NEW_ITEM, { cheese: 3.56 }));
      assert.deepEqual(store.getState(), desiredState);
    });
  });

  //closing bracket
});
