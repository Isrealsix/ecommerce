import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
	productListReducer,
	productDetailsReducer,
	cartReducer,
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateProfileReducer,
	orderCreateReducer,
	orderDetailsReducer,
	orderPayReducer,
	orderListMyReducer,
	orderListReducer,
	orderDeliverReducer,
	userListReducer,
	userDeleteReducer,
	userUpdateReducer,
	productDeleteReducer,
	productCreateReducer,
	productUpdateReducer,
} from './reducers';

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	productDelete: productDeleteReducer,
	productCreate: productCreateReducer,
	productUpdate: productUpdateReducer,
	cart: cartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userList: userListReducer,
	userDelete: userDeleteReducer,
	userUpdate: userUpdateReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	orderListMy: orderListMyReducer,
	orderList: orderListReducer,
	orderDeliver: orderDeliverReducer,
});

const cartItemsLS = localStorage.getItem('cartItems');
const cartItemsFromStorage = cartItemsLS ? JSON.parse(cartItemsLS) : [];

const userInfoLS = localStorage.getItem('userInfo');
const userInfoFromStorage = userInfoLS ? JSON.parse(userInfoLS) : null;

const shippingAddressLS = localStorage.getItem('shippingAddress');
const shippingAddressFromStorage = shippingAddressLS
	? JSON.parse(shippingAddressLS)
	: {};

const initialState = {
	cart: {
		cartItems: cartItemsFromStorage,
		shippingAddress: shippingAddressFromStorage,
	},
	userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
