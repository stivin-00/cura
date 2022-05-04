import {combineReducers} from 'redux';
import cart from './cart';
import error from './error';
import products from './products';
import {userRegisterReducer, userSigninReducer} from './auth';
import wishList from './wishList';

export default combineReducers({
  error: error,
  cart: cart,
  products: products,
  userRegister: userRegisterReducer,
  userSignin: userSigninReducer,
  wishList: wishList,
});
