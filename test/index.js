import store, { RESET_STATE, TEST } from './store.js';
import chai from 'chai';
const assert = chai.assert;
const expect = chai.expect;

describe('combine-actions', () => {

  const createAction = (type, data) => {
    return {
      type,
      data,
    }
  }

  describe('Testing test', () => {

    afterEach('set store to initial state', () => store.dispatch(createAction(RESET_STATE)));

    it('dispatches action to update state', () => {
      const desiredState = {
        test: 'hello world',
      };

      store.dispatch(createAction(TEST, 'hello world'));
      assert.deepEqual(store.getState(), desiredState);
    });

  });

  //closing bracket
});
