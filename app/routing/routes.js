/**
 * @author Amusoftech <er.amudeep@gmail.com>
 * @description List of routes for Tabs Navigator and Stack navigator, Along addational  Option for Tabs
 */
import React from 'react';
import Home from '../screens/Home/Home';
import ProductDetails from '../screens/ProductDetails/ProductDetails';

import WriteReview from '../screens/WriteReview/WriteReview';
import Cart from '../screens/Cart/Cart';
import Checkout from '../screens/Checkout/Checkout';
import CheckoutPayment from '../screens/Checkout/CheckoutPayment';
import Filters from '../screens/Filter/Filter';
import Search from '../screens/Search/Search';
import CheckoutDelivery from '../screens/Checkout/CheckoutDelivery';
import CheckOutSteper from '../screens/Checkout/CheckOutSteper';
import Summary from '../screens/Summary/Summary';
import Account from '../screens/Account/Account';
import WishList from '../screens/WishList/WishList';

import Login from '../screens/Login/Login';
import SignUp from '../screens/SignUp/SignUp';
import Verification from '../screens/Verification/Verification';
import Welcome from '../screens/Welcome/Welcome';

import Orders from '../screens/Orders/Orders';
import Address from '../screens/Address/Address';
import Feather from 'react-native-vector-icons/dist/Feather';
import {appColors} from '../utils/appColors';
import {scale} from 'react-native-size-matters';
import Category from '../screens/Category/Category';

export const RoutesList = [
  // {
  //   name: 'Welcome',
  //   component: Welcome,
  //   options: {
  //     tabBarStyle: {display: 'none'},
  //     tabBarButton: props => null,
  //     tabBarVisible: false,
  //     tabBarBadge: 3,
  //     tabBarLabel: 'Welcome',
  //   },
  // },
  {
    name: 'Login',
    component: Login,
    options: {
      tabBarButton: props => null,
      tabBarVisible: false,
      tabBarBadge: 3,
      tabBarLabel: 'Login',
    },
  },
  {
    name: 'SignUp',
    component: SignUp,
    options: {
      // tabBarStyle: {display: 'none'},
      tabBarButton: props => null,
      tabBarVisible: false,
      tabBarBadge: 3,
      tabBarLabel: 'SignUp',
    },
  },
  // {
  //   name: 'Home',
  //   component: Home,
  //   options: {
  //     backBehavior: 'history',
  //     //tabBarBadge: 3,
  //     tabBarIcon: props => (
  //       <Feather
  //         name={'mouse-pointer'}
  //         size={scale(20)}
  //         color={appColors.primary}
  //         {...props}
  //       />
  //     ),
  //     tabBarLabel: 'Home',
  //   },
  // },
  // {
  //   name: 'Cart',
  //   component: Cart,
  //   options: {
  //     // tabBarBadge: 3,
  //     tabBarIcon: props => (
  //       <Feather
  //         name={'shopping-cart'}
  //         size={scale(20)}
  //         color={appColors.primary}
  //         {...props}
  //       />
  //     ),
  //     tabBarLabel: 'Cart',
  //   },
  // },

  {
    name: 'ProductDetails',
    component: ProductDetails,
    options: {
      tabBarButton: props => null,
      tabBarVisible: false,
      tabBarBadge: 3,
      tabBarLabel: 'ProductDetails',
    },
  },

  {
    name: 'WriteReview',
    component: WriteReview,
    options: {
      tabBarButton: props => null,
      tabBarVisible: false,
      tabBarBadge: 3,
      tabBarLabel: 'WriteReview',
    },
  },

  {
    name: 'Checkout',
    component: Checkout,
    options: {
      tabBarButton: props => null,
      //tabBarVisible:false,
      //tabBarBadge: 3,
      tabBarLabel: 'Checkout',
    },
  },

  {
    name: 'CheckoutPayment',
    component: CheckoutPayment,
    options: {
      tabBarButton: props => null,
      //tabBarVisible:false,
      //tabBarBadge: 3,
      tabBarLabel: 'CheckoutPayment',
    },
  },

  {
    name: 'Category',
    component: Category,
    options: {
      tabBarButton: props => null,
      tabBarVisible: false,
      //tabBarBadge: 3,
      tabBarLabel: 'Category',
    },
  },

  {
    name: 'Filters',
    component: Filters,
    options: {
      tabBarButton: props => null,
      tabBarVisible: false,
      //tabBarBadge: 3,
      tabBarLabel: 'Filters',
    },
  },

  {
    name: 'Search',
    component: Search,
    options: {
      tabBarButton: props => null,
      //tabBarVisible: false,
      //tabBarBadge: 3,
      tabBarLabel: 'Search',
    },
  },

  {
    name: 'CheckoutDelivery',
    component: CheckoutDelivery,
    options: {
      tabBarButton: props => null,
      tabBarVisible: false,
      //tabBarBadge: 3,
      tabBarLabel: 'CheckoutDelivery',
    },
  },

  {
    name: 'CheckOutSteper',
    component: CheckOutSteper,
    options: {
      tabBarButton: props => null,
      tabBarVisible: false,
      //tabBarBadge: 3,
      tabBarLabel: 'CheckOutSteper',
    },
  },

  {
    name: 'Summary',
    component: Summary,
    options: {
      tabBarButton: props => null,
      tabBarVisible: false,
      //tabBarBadge: 3,
      tabBarLabel: 'Summary',
    },
  },

  // {
  //   name: 'Account',
  //   component: Account,
  //   options: {
  //     backBehavior: 'history',
  //     // tabBarButton: (props) => null,
  //     //tabBarVisible: false,
  //     //tabBarBadge: 3,
  //     tabBarIcon: props => (
  //       <Feather
  //         name={'user'}
  //         size={scale(20)}
  //         color={appColors.primary}
  //         {...props}
  //       />
  //     ),
  //     tabBarLabel: 'Account',
  //   },
  // },
  {
    name: 'Orders',
    component: Orders,
    options: {
      tabBarButton: props => null,
      //tabBarVisible: false,
      //tabBarBadge: 3,
      tabBarLabel: 'Orders',
    },
  },
  {
    name: 'Address',
    component: Address,
    options: {
      tabBarButton: props => null,
      //tabBarVisible: false,
      //tabBarBadge: 3,
      tabBarLabel: 'Address',
    },
  },
];
