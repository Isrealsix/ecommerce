import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
	productListReducer,
	productDetailsReducer,
	cartReducer,
	userLoginReducer,
	userRegisterReducer,
} from './reducers';

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer
});

const cartItemsLS = localStorage.getItem('cartItems');
const cartItemsFromStorage = cartItemsLS ? JSON.parse(cartItemsLS) : [];

const userInfoLS = localStorage.getItem('userInfo');
const userInfoFromStorage = userInfoLS ? JSON.parse(cartItemsLS) : null;

const initialState = {
	cart: { cartItems: cartItemsFromStorage },
	userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
