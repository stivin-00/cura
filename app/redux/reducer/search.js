/* eslint-disable prettier/prettier */
const {
  SEARCH_LIST_REQUEST,
  SEARCH_LIST_SUCCESS,
  SEARCH_LIST_FAIL,
} = require('../constants/searchConstant');

export const searchListReducer = (
    state = {loading: true, products: []},
    action,
  ) => {
    switch (action.type) {
      case SEARCH_LIST_REQUEST:
        return {loading: true};
      case SEARCH_LIST_SUCCESS:
        return {
          loading: false,
          products: action.payload.products,
          pages: action.payload.pages,
          page: action.payload.page,
        };
      case SEARCH_LIST_FAIL:
        return {loading: false, error: action.payload};
      default:
        return state;
    }
  };
