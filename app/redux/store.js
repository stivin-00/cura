// import {createStore, applyMiddleware} from 'redux';
// import createSagaMiddleware from 'redux-saga';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import rootSaga from './sagas';
// import rootReducer from './reducer';
// import {persistStore, persistReducer} from 'redux-persist';

// const sagaMiddleware = createSagaMiddleware();
// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
//   //blacklist:[ 'wishList'/*  'cart' */] //Add reducer if you don`t want to presist it
// };
// const middleWares = [sagaMiddleware];

// //1
// const persistedReducer = persistReducer(persistConfig, rootReducer);
import AsyncStorage from '@react-native-async-storage/async-storage';
// const store = createStore(persistedReducer, applyMiddleware(...middleWares));
// let persistor = persistStore(store);
// sagaMiddleware.run(rootSaga);

// export default {store, persistor};

import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
// import {cartReducer} from './reducer/cart';
import {cartReducer} from './reducer/cart';
// import {finalCartReducer} from './reducer/finalCart';
import {
  orderCreateReducer,
  //   orderDeleteReducer,
  //   orderDeliverReducer,
  //   orderDetailsReducer,
  // orderListReducer,
  orderMineListReducer,
  //   orderPayReducer,
  //   orderSummaryReducer,
} from './reducer/order';
import {
  productCategoryListReducer,
  productSearchListReducer,
  productDetailsReducer,
  productListReducer,
  productReviewCreateReducer,
} from './reducer/products';
import {
  // userAddressMapReducer,
  // userDeleteReducer,
  // userDetailsReducer,
  // userListReducer,
  userRegisterReducer,
  userSigninReducer,
  // userTopSellerListReducer,
  // userUpdateProfileReducer,
  // userUpdateReducer,
} from './reducer/auth';

// const getData = async () => {
//   try {
//     const userInfo = await AsyncStorage.getItem('userInfo');
//     return userInfo != null ? JSON.parse(userInfo) : null;
//   } catch (e) {
//     console.log('error occured', e);
//   }
// };

// AsyncStorage.getItem('userInfo').then(value => {
//   if (value != null) {
//     let usert = JSON.parse(value);
//     dispatch({type: USER_SIGNIN_SUCCESS, payload: usert});
//     console.log(usert);
//   } else {
//     return [];
//   }
// });

const initialState = {
  // userSignin: {
  //   userInfo: AsyncStorage.getItem('userInfo')
  //     ? JSON.parse(AsyncStorage.getItem('userInfo'))
  //     : null,
  // },
  //   shippingAddress: AsyncStorage.getItem('shippingAddress').then(value => {
  //     if (value != null) {
  //       return JSON.parse(value);
  //     } else {
  //       return {};
  //     }
  //   }),
  //   paymentMethod: 'card',
  // },
  // cart: {
  // cartItems: AsyncStorage.getItem('cartItems')
  //   ? JSON.parse(AsyncStorage.getItem('cartItems'))
  //   : [],
  // shippingAddress: AsyncStorage.getItem('shippingAddress')
  //   ? JSON.parse(AsyncStorage.getItem('shippingAddress'))
  //   : {},
  // paymentMethod: 'card',
};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  // cart: cartReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  // orderDetails: orderDetailsReducer,
  // orderPay: orderPayReducer,
  orderMineList: orderMineListReducer,
  // userDetails: userDetailsReducer,
  // userUpdateProfile: userUpdateProfileReducer,
  // userUpdate: userUpdateReducer,
  // orderList: orderListReducer,
  // orderDelete: orderDeleteReducer,
  // orderDeliver: orderDeliverReducer,
  // userList: userListReducer,
  // userDelete: userDeleteReducer,
  // userTopSellersList: userTopSellerListReducer,
  productCategoryList: productCategoryListReducer,
  productSearchList: productSearchListReducer,
  productReviewCreate: productReviewCreateReducer,
  // userAddressMap: userAddressMapReducer,
  // orderSummary: orderSummaryReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  // initialState,
  composeEnhancer(applyMiddleware(thunk)),
);

export default store;
