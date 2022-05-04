const {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_SEARCH_FAIL,
  PRODUCT_SEARCH_REQUEST,
  PRODUCT_SEARCH_SUCCESS,
  PRODUCT_CATEGORY_LIST_REQUEST,
  PRODUCT_CATEGORY_LIST_SUCCESS,
  PRODUCT_CATEGORY_LIST_FAIL,
  PRODUCT_REVIEW_CREATE_REQUEST,
  PRODUCT_REVIEW_CREATE_SUCCESS,
  PRODUCT_REVIEW_CREATE_FAIL,
  PRODUCT_REVIEW_CREATE_RESET,
} = require('../constants/productConstants');

export const productListReducer = (
  state = {loading: true, products: [], bestSelling: []},
  action,
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {loading: true};
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case PRODUCT_LIST_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
};
export const productSearchListReducer = (
  state = {loading: true, searchList: []},
  action,
) => {
  switch (action.type) {
    case PRODUCT_SEARCH_REQUEST:
      return {loading: true};
    case PRODUCT_SEARCH_SUCCESS:
      return {
        loading: false,
        searchLists: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case PRODUCT_SEARCH_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
};
export const productCategoryListReducer = (
  state = {loading: true, catProducts: []},
  action,
) => {
  switch (action.type) {
    case PRODUCT_CATEGORY_LIST_REQUEST:
      return {loading: true};
    case PRODUCT_CATEGORY_LIST_SUCCESS:
      return {loading: false, catProducts: action.payload.products};
    case PRODUCT_CATEGORY_LIST_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
};

export const productDetailsReducer = (state = {loading: true}, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {loading: true};
    case PRODUCT_DETAILS_SUCCESS:
      return {loading: false, product: action.payload};
    case PRODUCT_DETAILS_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
};

export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_REVIEW_CREATE_REQUEST:
      return {loading: true};
    case PRODUCT_REVIEW_CREATE_SUCCESS:
      return {loading: false, success: true, review: action.payload};
    case PRODUCT_REVIEW_CREATE_FAIL:
      return {loading: false, error: action.payload};
    case PRODUCT_REVIEW_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
