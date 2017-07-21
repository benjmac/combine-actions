Is meant to create a link between two pieces of state, to clean up the reducer of unnecessary cases.

Of course this isn't for all instances
It assumes you will be wanting to add it to the same type of the original
example, messages is an array, a new message will be added to that array.
A list of items in an object, adding a new item to that object.

I could have made it to where it would take multiple things to be combined but, I want it to where only two, as you have to create a specific name for your middleware to then be plugged ins. As in newMessage, newItem etc...

This is how you create the middleware to be added to the createStore.
const addMessage = combineActions(NEW_MESSAGE, GET_MESSAGES);
the combine actions function takes two arguments. First, the action creator that will be updating/adding a specific element to the state, the second being the action creator that retreieves all of those items.
So you add a NEW_MESSAGE and GET_MESSAGES is capable of retrieving all the messages.

And import deatil with combine-actions, the naming of the actions types is very important. The last element needs to match up with the state.
For example...

export const NEW_MESSAGE = 'NEW_MESSAGE';
export const GET_MESSAGES = 'GET_MESSAGES';

state.messages
