import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({})
const initialState = {};
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;