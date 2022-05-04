/* eslint-disable prettier/prettier */
import Axios from 'axios';
import {AlertHelper} from '../utils/AlertHelper';
import {
  SEARCH_LIST_FAIL,
  SEARCH_LIST_REQUEST,
  SEARCH_LIST_SUCCESS,
} from './constants/productConstants';

export const listSearch =
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
      type: SEARCH_LIST_REQUEST,
    });
    console.log('request');
    try {
      const {data} = await Axios.get(
        `https://jumstore-store.herokuapp.com/api/products?pageNumber=${pageNumber}&name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}`,
      );
      console.log('done', data);
      dispatch({type: SEARCH_LIST_SUCCESS, payload: data});
    } catch (error) {
      dispatch({type: SEARCH_LIST_FAIL, payload: error.message});
      console.log('request', error.message);
    }
  };
