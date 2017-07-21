import store, { RESET_STATE, NEW_MESSAGE, NEW_ITEM } from './store.js';
import chai from 'chai';
const assert = chai.assert;
const expect = chai.expect;

describe('combine-actions', () => {

  const createAction = (type, payload) => {
    return {
      type,
      payload,
    }
  }

  describe('Testing Test Case', () => {

    afterEach('set store to initial state', () => store.dispatch(createAction(RESET_STATE)));

    xit('dispatches action to update state', () => {
      const desiredState = {
        test: 'hello world',
        messages: ['how are you?'],
      };

      store.dispatch(createAction(TEST, 'hello world'));
      assert.deepEqual(store.getState(), desiredState);
    });

  });

  describe('Dispatching a new message, arrays', () => {

    afterEach('set store to initial state', () => store.dispatch(createAction(RESET_STATE)));

    it('dispatches action to update state', () => {
      const desiredState = {
        messages: ['how are you?', 'New Message'],
        items: {
          soap: 1.99,
          soda: 1.55,
          jam: 3.99
        }
      };

      store.dispatch(createAction(NEW_MESSAGE, 'New Message'));
      assert.deepEqual(store.getState(), desiredState);
    });
  });

  describe('Adding new item to a list, Object', () => {

    afterEach('set store to initial state', () => store.dispatch(createAction(RESET_STATE)));

    it('dispatches action to update state', () => {
      const desiredState = {
        messages: ['how are you?'],
        items: {
          soap: 1.99,
          soda: 1.55,
          jam: 3.99,
          candy: 1.25
        }
      };

      store.dispatch(createAction(NEW_ITEM, {candy: 1.25}));
      assert.deepEqual(store.getState(), desiredState);
    });
  });

  //closing bracket
});
