/* eslint-disable prettier/prettier */
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
} from '../constants/cartConstants';

const initialState = {
  cart: [],
  delivery: 'Standard Delivey',
  address: {},
  payment: 'Pay on Delivery',
  final: {},
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      if (Array.isArray(item)) {
        return {...state, error: '', cart: [...state.cart, ...item]};
      } else {
        const existItem = state.cart.find(x => x.product === item.product);
        if (existItem) {
          return {
            ...state,
            error: '',
            cart: state.cart.map(x =>
              x.product === existItem.product ? item : x,
            ),
          };
        } else {
          return {...state, error: '', cart: [...state.cart, item]};
        }
      }

    case REMOVE_FROM_CART:
      const product = action.payload;
      return {
        ...state,
        cart: state.cart.filter(item => item.product !== product),
      };
    case ADD_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product === action.payload ? {...item, qty: item.qty + 1} : item,
        ),
      };
    case SUB_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product === action.payload
            ? {
                ...item,
                qty: item.qty !== 1 ? item.qty - 1 : 1,
              }
            : item,
        ),
      };
    case EMPTY_CART:
      return {...state, error: '', cart: []};

    case DELIVERY:
      return {...state, delivery: action.payload};
    case PAYMENT:
      return {...state, payment: action.payload};
    case SHIPPING:
      return {...state, address: action.payload};
    case FINAL:
      return {...state, final: action.payload};
    default:
      return state;
  }
};
export {cartReducer};
