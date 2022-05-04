import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/dist/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, Text, StyleSheet, Image, Animated} from 'react-native';
import {appColors} from '../utils/appColors';
import {scale} from 'react-native-size-matters';
import Login from '../screens/Login/Login';
import SignUp from '../screens/SignUp/SignUp';
import Badge from './Badge';
import Home from '../screens/Home/Home';
import Cart from '../screens/Cart/Cart';
import Account from '../screens/Account/Account';
import Verification from '../screens/Verification/Verification';
import WishList from '../screens/WishList/WishList';

const shop = require('../utils/images/iconshop.png');
const user = require('../utils/images/iconuser.png');
const home = require('../utils/images/iconhome.png');

export const publicRoutes = [
  {
    name: 'Home',
    component: Home,
    options: {
      backBehavior: 'history',
      //tabBarBadge: 3,
      tabBarIcon: ({focused, color}) => (
        <Icon
          name="home"
          size={focused ? 29 : 25}
          color={focused ? appColors.primary : 'black'}
        />
      ),
      tabBarLabel: 'Home',
    },
  },
  {
    name: 'WishList',
    component: WishList,
    options: {
      backBehavior: 'history',
      //tabBarBadge: 3,
      tabBarIcon: ({focused, color}) => (
        <Icon
          name="heart"
          size={focused ? 29 : 25}
          color={focused ? appColors.primary : 'black'}
        />
      ),
      tabBarLabel: 'WishList',
    },
  },
  {
    name: 'Cart',
    component: Cart,
    options: {
      tabBarBadge: <Badge></Badge>,
      tabBarIcon: ({focused, color}) => (
        <Icon
          name="shopping-cart"
          size={focused ? 29 : 25}
          color={focused ? appColors.primary : 'black'}
        />
      ),
      tabBarLabel: 'Cart',
    },
  },
  {
    name: 'Account',
    component: Account,
    options: {
      backBehavior: 'history',
      // tabBarButton: (props) => null,
      //tabBarVisible: false,
      //tabBarBadge: 3,
      tabBarIcon: ({focused, color}) => (
        <Icon
          name="user"
          size={focused ? 29 : 25}
          color={focused ? appColors.primary : 'black'}
        />
      ),
      tabBarLabel: 'Account',
    },
  },
  // {
  //   name: 'Welcome',
  //   component: Welcome,
  //   options: {
  //     tabBarButton: props => null,
  //     tabBarVisible: false,
  //     tabBarBadge: 3,
  //     tabBarLabel: 'Welcome',
  //   },
  // },
  // {
  //   name: 'Login',
  //   component: Login,
  //   options: {
  //     tabBarButton: props => null,
  //     tabBarVisible: false,
  //     tabBarBadge: 3,
  //     tabBarLabel: 'Login',
  //   },
  // },
  // {
  //   name: 'SignUp',
  //   component: SignUp,
  //   options: {
  //     tabBarButton: props => null,
  //     tabBarVisible: false,
  //     tabBarBadge: 3,
  //     tabBarLabel: 'SignUp',
  //   },
  // },

  {
    name: 'Verification',
    component: Verification,
    options: {
      tabBarButton: props => null,
      tabBarVisible: false,
      tabBarBadge: 3,
      tabBarLabel: 'Verification',
    },
  },
];
