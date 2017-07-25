import store, { storeWithNestedState, RESET_STATE, NEW_MESSAGE, NEW_ITEM, NEW_TEST } from './store.js';
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

  describe('Testing combineActions is a function', () => {

    it('Confirm it is a function', () => {
      assert.typeOf(combineActions, 'function');
      assert.strictEqual(combineActions.length, 3);
    });
  });


  describe('Adding a new message to an Array of messages', () => {

    afterEach('set store to initial state', () => store.dispatch(createAction(RESET_STATE)));

    it('dispatches action to update state', () => {
      const desiredState = {
        messages: ['how are you?', 'New Message'],
        items: {
          soap: 1.99,
          soda: 1.55,
          jam: 3.99
        },
        test: null
      };
      //send whatever you want to add to the existing array
      store.dispatch(createAction(NEW_MESSAGE, 'New Message'));
      assert.deepEqual(store.getState(), desiredState);
    });

    it('dispatches two actions to update state', () => {
      const desiredState = {
        messages: ['how are you?', 'Foo', 'Bar'],
        items: {
          soap: 1.99,
          soda: 1.55,
          jam: 3.99
        },
        test: null
      };
      //send whatever you want to add to the existing array
      store.dispatch(createAction(NEW_MESSAGE, 'Foo'));
      store.dispatch(createAction(NEW_MESSAGE, 'Bar'));
      assert.deepEqual(store.getState(), desiredState);
    });
  });

  describe('Adding new item to an Object of items', () => {

    afterEach('set store to initial state', () => store.dispatch(createAction(RESET_STATE)));

    it('dispatches action to update state', () => {
      const desiredState = {
        messages: ['how are you?'],
        items: {
          soap: 1.99,
          soda: 1.55,
          jam: 3.99,
          candy: 1.25
        },
        test: null
      };
      //send object of what you want to add to the existing object
      store.dispatch(createAction(NEW_ITEM, { candy: 1.25 }));
      assert.deepEqual(store.getState(), desiredState);
    });

    it('dispatches two actions to update state', () => {
      const desiredState = {
        messages: ['how are you?'],
        items: {
          soap: 1.99,
          soda: 1.55,
          jam: 3.99,
          juice: 1.05,
          cheese: 3.56
        },
        test: null
      };
      //send object of what you want to add to the existing object
      store.dispatch(createAction(NEW_ITEM, { juice: 1.05 }));
      store.dispatch(createAction(NEW_ITEM, { cheese: 3.56 }));
      assert.deepEqual(store.getState(), desiredState);
    });

    it('null test, making sure it rejects an initial state that is null', () => {
      const desiredState = {
        messages: ['how are you?'],
        items: {
          soap: 1.99,
          soda: 1.55,
          jam: 3.99,
        },
        test: null
      };
      //errors loudly instead of function just ignoring any specific values
      try {
        store.dispatch(createAction(NEW_TEST, { foo: 'bar' }));
      }
      catch (err) {
        expect(err).to.be.an('error');
      }
    });

  });

  describe('Testing combineActions when there is nested state with combine reducers', () => {

    afterEach('set store to initial state', () => storeWithNestedState.dispatch(createAction(RESET_STATE)));

    it('dispatches action to update array in state', () => {
      const desiredState = {
        reducer: {
          messages: ['how are you?', 'New Message'],
          items: {
            soap: 1.99,
            soda: 1.55,
            jam: 3.99
          },
          test: null
        }
      };
      //send whatever you want to add to the existing array
      storeWithNestedState.dispatch(createAction(NEW_MESSAGE, 'New Message'));
      assert.deepEqual(storeWithNestedState.getState(), desiredState);
    });

    it('dispatches action to update object in state', () => {
      const desiredState = {
        reducer: {
          messages: ['how are you?'],
          items: {
            soap: 1.99,
            soda: 1.55,
            jam: 3.99,
            candy: 1.25
          },
          test: null
        }
      };
      //send object of what you want to add to the existing object
      storeWithNestedState.dispatch(createAction(NEW_ITEM, { candy: 1.25 }));
      assert.deepEqual(storeWithNestedState.getState(), desiredState);
    });

  });

  //closing bracket
});
