import Axios from 'axios';
import {AlertHelper} from '../utils/AlertHelper';
import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_SEARCH_FAIL,
  PRODUCT_SEARCH_REQUEST,
  PRODUCT_SEARCH_SUCCESS,
  PRODUCT_CATEGORY_LIST_SUCCESS,
  PRODUCT_CATEGORY_LIST_REQUEST,
  PRODUCT_CATEGORY_LIST_FAIL,
  PRODUCT_REVIEW_CREATE_REQUEST,
  PRODUCT_REVIEW_CREATE_SUCCESS,
  PRODUCT_REVIEW_CREATE_FAIL,
} from './constants/productConstants';

export const listProducts =
  ({
    pageNumber = '',
    name = '',
    category = '',
    order = '',
    min = 0,
    max = 0,
    rating = 0,
  }) =>
  async dispatch => {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });
    try {
      const {data} = await Axios.get(
        `https://jumstore-store.herokuapp.com/api/products?pageNumber=${pageNumber}&name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}`,
      );
      dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
    } catch (error) {
      dispatch({type: PRODUCT_LIST_FAIL, payload: error.message});
    }
  };
export const searchList =
  ({
    pageNumber = '',
    name = '',
    category = '',
    order = '',
    min = 0,
    max = 0,
    rating = 0,
  }) =>
  async dispatch => {
    dispatch({
      type: PRODUCT_SEARCH_REQUEST,
    });
    try {
      const {data} = await Axios.get(
        `https://jumstore-store.herokuapp.com/api/products?pageNumber=${pageNumber}&name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}`,
      );
      console.log(data);
      dispatch({type: PRODUCT_SEARCH_SUCCESS, payload: data});
    } catch (error) {
      dispatch({type: PRODUCT_SEARCH_FAIL, payload: error.message});
    }
  };

export const listProductCategories =
  ({
    pageNumber = '',
    name = '',
    category = '',
    order = '',
    min = 0,
    max = 0,
    rating = 0,
  }) =>
  async dispatch => {
    dispatch({
      type: PRODUCT_CATEGORY_LIST_REQUEST,
    });
    try {
      const {data} = await Axios.get(
        `https://jumstore-store.herokuapp.com/api/products?pageNumber=${pageNumber}&name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}`,
      );
      dispatch({type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data});
      console.log(data);
    } catch (error) {
      dispatch({type: PRODUCT_CATEGORY_LIST_FAIL, payload: error.message});
    }
  };

export const detailsProduct = productId => async dispatch => {
  dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId});
  try {
    const {data} = await Axios.get(
      `https://jumstore-store.herokuapp.com/api/products/${productId}`,
    );
    dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createReview =
  (productId, review) => async (dispatch, getState) => {
    dispatch({type: PRODUCT_REVIEW_CREATE_REQUEST});
    const {
      userSignin: {userInfo},
    } = getState();
    try {
      const {data} = await Axios.post(
        `https://jumstore-store.herokuapp.com/api/products/${productId}/reviews`,
        review,
        {
          headers: {Authorization: `Bearer ${userInfo.token}`},
        },
      );
      dispatch({
        type: PRODUCT_REVIEW_CREATE_SUCCESS,
        payload: data.review,
      });
      AlertHelper.show('success', 'review added thanks for your review');
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({type: PRODUCT_REVIEW_CREATE_FAIL, payload: message});
      AlertHelper.show('error', error.message);
    }
  };
