import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer } from './reducer/productReducers';
import { cartReducer } from './reducer/cartReducer';
import Cookie from 'js-cookie';
import thunk from 'redux-thunk';
import { userSigninReducer, userRegisterReducer } from './reducer/userReducer';

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || [];
 
const initialState = {
  cart: { cartItems },
  userSignin: { userInfo }
};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  productSave: productSaveReducer,
  productDelete: productDeleteReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;  
const store = createStore(
  reducer, 
  initialState, 
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
