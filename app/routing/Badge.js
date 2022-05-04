/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text} from 'react-native';
import {useEffect, useState} from 'react';
import {scale} from 'react-native-size-matters';
import {appColors} from '../utils/appColors';
import {useDispatch, useSelector} from 'react-redux';

export default function Badge({label}) {
  const cart = useSelector(state => state.cart.cart);
  let length = cart.length;

  return (

      <Text style={{color: 'black', fontSize: 15}}>{length}</Text>

  );
}
