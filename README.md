Is meant to create a link between two pieces of state, to clean up the reducer of unnecessary cases.
Also, you can visually connect those two actions, making it easier to follow the flow of the code when others are reading.

//action creator must have action.payload...

Of course this isn't for all instances
It assumes you will be wanting to add it to the same type of the original
example, messages is an array, a new message will be added to that array.
A list of items in an object, adding a new item to that object.

I could have made it to where it would take multiple things to be combined but, I want it to where only two, as you have to create a specific name for your middleware to then be plugged ins. As in newMessage, newItem etc...

This is how you create the middleware to be added to the createStore.

const GET_MESSAGES = 'GET_MESSAGES';
const NEW_MESSAGE = 'NEW_MESSAGE';
const messages = 'messages';

const addMessage = combineActions(NEW_MESSAGE, GET_MESSAGES, messages);

The combine actions function takes three arguments. First, the action creator that will be updating/adding a specific element to the state, the second being the action creator that retreieves all of those items. Third, the specific property on the state that you will be wanting to update.
So you add a NEW_MESSAGE and GET_MESSAGES is capable of retrieving all the messages, by updating the property of 'messages' on the state.

If you send an array, it would add that value to the array, as nested.

It's different with objects. Sending an object with a property and value will only add it to the linked one you're attempting to update.

Need to take into account if you're combining reducers. As that changes the properties that you'd be accessing.

Requires specific initial state of an empty array or object.
