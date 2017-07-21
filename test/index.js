import store, { RESET_STATE, TEST, NEW_MESSAGE } from './store.js';
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

  describe('Testing test', () => {

    afterEach('set store to initial state', () => store.dispatch(createAction(RESET_STATE)));

    it('dispatches action to update state', () => {
      const desiredState = {
        test: 'hello world',
        messages: ['how are you?'],
      };

      store.dispatch(createAction(TEST, 'hello world'));
      assert.deepEqual(store.getState(), desiredState);
    });

  });

  describe('Dispatchin a new message', () => {

    afterEach('set store to initial state', () => store.dispatch(createAction(RESET_STATE)));

    it('dispatches action to update state', () => {
      const desiredState = {
        test: '',
        messages: ['how are you?', 'New Message'],
      };

      store.dispatch(createAction(NEW_MESSAGE, 'New Message'));
      assert.deepEqual(store.getState(), desiredState);
    });

  });

  //closing bracket
});
