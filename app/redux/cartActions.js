/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {AlertHelper} from '../utils/AlertHelper';
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_QUANTITY,
  SUB_QUANTITY,
  EMPTY_CART,
  DELIVERY,
  SHIPPING,
  PAYMENT,
  FINAL,
} from './constants/cartConstants';

export const addToCart = (productId, qty, size) => async (dispatch, getState) => {
  const {data} = await axios.get(
    `https://jumstore-store.herokuapp.com/api/products/${productId}`,
  );
  dispatch({
    type: ADD_TO_CART,
    payload: {
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      product: data._id,
      qty,
      size,
    },
  });
  await AsyncStorage.setItem('cartItems', JSON.stringify(getState().cart.cart));
};
export const removeFromCart = id => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: id,
  });
  console.log('removed', id);
  await AsyncStorage.setItem('cartItems', JSON.stringify(getState().cart.cart));
};
export const subtractQuantity = id => async (dispatch, getState) => {
  dispatch({
    type: SUB_QUANTITY,
    payload: id,
  });
  await AsyncStorage.setItem('cartItems', JSON.stringify(getState().cart.cart));
};
export const addQuantity = id => async (dispatch, getState) => {
  dispatch({
    type: ADD_QUANTITY,
    payload: id,
  });
  await AsyncStorage.setItem('cartItems', JSON.stringify(getState().cart.cart));
};
export const emptyCart = () => async (dispatch, getState) => {
  return {
    type: EMPTY_CART,
  };

  //   await AsyncStorage.setItem('cartItems', JSON.stringify(getState().cart.cart));
};
export const deliveryType = data => async dispatch => {
  dispatch({
    type: DELIVERY,
    payload: data,
  });
  console.log('delivery type is ', data);
};
export const address = data => async dispatch => {
  dispatch({
    type: SHIPPING,
    payload: data,
  });
  AlertHelper.show('success', 'adress saved successfully');
  console.log('address is ', data);
};
export const paymentType = data => async dispatch => {
  dispatch({
    type: PAYMENT,
    payload: data,
  });
  console.log('payment type is ', data);
};
export const finalAmount = data => async dispatch => {
  dispatch({
    type: FINAL,
    payload: data,
  });
  console.log('payment type is ', data);
};
