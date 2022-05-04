/* eslint-disable prettier/prettier */
import Axios from 'axios';
import {AlertHelper} from '../utils/AlertHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {EMPTY_CART} from './constants/cartConstants';
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_MINE_LIST_REQUEST,
  ORDER_MINE_LIST_FAIL,
  ORDER_MINE_LIST_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_SUMMARY_REQUEST,
  ORDER_SUMMARY_SUCCESS,
} from './constants/orderConstants';

export const createOrder = order => async (dispatch, getState) => {
  dispatch({type: ORDER_CREATE_REQUEST, payload: order});
  console.log('started ======>>>>', order);
  try {
    const {
      userSignin: {userInfo},
    } = getState();
    const {data} = await Axios.post(
      'https://jumstore-store.herokuapp.com/api/orders',
      order,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      },
    );
    console.log('data ===>', data);
    dispatch({type: ORDER_CREATE_SUCCESS, payload: data.order});
    console.log('succesa ===>', data.order);
    dispatch({type: EMPTY_CART});
    AlertHelper.show('success', 'order place Successfully');
    console.log('ordersuccess =======>>>>>>', data);
    AsyncStorage.removeItem('cartItems');
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    console.log('error ===>', error.response);
    AlertHelper.show('error', 'order failed try again');
  }
};

export const detailsOrder = orderId => async (dispatch, getState) => {
  dispatch({type: ORDER_DETAILS_REQUEST, payload: orderId});
  const {
    userSignin: {userInfo},
  } = getState();
  try {
    const {data} = await Axios.get(
      `https://jumstore-store.herokuapp.com/api/orders/${orderId}`,
      {
        headers: {Authorization: `Bearer ${userInfo.token}`},
      },
    );
    dispatch({type: ORDER_DETAILS_SUCCESS, payload: data});
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({type: ORDER_DETAILS_FAIL, payload: message});
  }
};

export const payOrder =
  (order, paymentResult) => async (dispatch, getState) => {
    dispatch({type: ORDER_PAY_REQUEST, payload: {order, paymentResult}});
    const {
      userSignin: {userInfo},
    } = getState();
    try {
      const {data} = Axios.put(
        `https://jumstore-store.herokuapp.com/api/orders/${order._id}/pay`,
        paymentResult,
        {
          headers: {Authorization: `Bearer ${userInfo.token}`},
        },
      );
      dispatch({type: ORDER_PAY_SUCCESS, payload: data});
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({type: ORDER_PAY_FAIL, payload: message});
    }
  };
export const listOrderMine = () => async (dispatch, getState) => {
  dispatch({type: ORDER_MINE_LIST_REQUEST});
  const {
    userSignin: {userInfo},
  } = getState();
  try {
    const {data} = await Axios.get(
      'https://jumstore-store.herokuapp.com/api/orders/mine',
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      },
    );
    dispatch({type: ORDER_MINE_LIST_SUCCESS, payload: data});
    console.log('orders', data);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({type: ORDER_MINE_LIST_FAIL, payload: message});
    console.log('error', error);
  }
};
export const listOrders = () => async (dispatch, getState) => {
  dispatch({type: ORDER_LIST_REQUEST});
  const {
    userSignin: {userInfo},
  } = getState();
  try {
    const {data} = await Axios.get(
      'https://jumstore-store.herokuapp.com/api/orders',
      {
        headers: {Authorization: `Bearer ${userInfo.token}`},
      },
    );
    console.log(data);
    dispatch({type: ORDER_LIST_SUCCESS, payload: data});
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({type: ORDER_LIST_FAIL, payload: message});
  }
};
export const deleteOrder = orderId => async (dispatch, getState) => {
  dispatch({type: ORDER_DELETE_REQUEST, payload: orderId});
  const {
    userSignin: {userInfo},
  } = getState();
  try {
    const {data} = Axios.delete(
      `https://jumstore-store.herokuapp.com/api/orders/${orderId}`,
      {
        headers: {Authorization: `Bearer ${userInfo.token}`},
      },
    );
    dispatch({type: ORDER_DELETE_SUCCESS, payload: data});
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({type: ORDER_DELETE_FAIL, payload: message});
  }
};

export const deliverOrder = orderId => async (dispatch, getState) => {
  dispatch({type: ORDER_DELIVER_REQUEST, payload: orderId});
  const {
    userSignin: {userInfo},
  } = getState();
  try {
    const {data} = Axios.put(
      `https://jumstore-store.herokuapp.com/api/orders/${orderId}/deliver`,
      {},
      {
        headers: {Authorization: `Bearer ${userInfo.token}`},
      },
    );
    dispatch({type: ORDER_DELIVER_SUCCESS, payload: data});
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({type: ORDER_DELIVER_FAIL, payload: message});
  }
};

export const summaryOrder = () => async (dispatch, getState) => {
  dispatch({type: ORDER_SUMMARY_REQUEST});
  const {
    userSignin: {userInfo},
  } = getState();
  try {
    const {data} = await Axios.get(
      'https://jumstore-store.herokuapp.com/api/orders/summary',
      {
        headers: {Authorization: `Bearer ${userInfo.token}`},
      },
    );
    dispatch({type: ORDER_SUMMARY_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
