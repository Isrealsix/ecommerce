import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { productListReducer, productDetailsReducer, cartReducer } from './reducers';

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer
});

const cartItemsLS = localStorage.getItem('cartItems')
const cartItemsFromSgorage = cartItemsLS ? JSON.parse(cartItemsLS) : [];

const initialState = {
	cart: { cartItems: cartItemsFromSgorage }
};
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;