/* eslint-disable prettier/prettier */
import React, {useEffect, useState, useRef} from 'react';
import _ from 'lodash';
import ReactNativePaystackWebviewModule, {
  Paystack,
  paystackProps,
} from 'react-native-paystack-webview';
import {createOrder} from '../../redux/orderActions';
import {TouchableOpacity, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AlertHelper} from '../../utils/AlertHelper';

export default function CheckoutPayment({navigation}) {
  const finalAmount = useSelector(state => state.cart.final);
  const {amount, delivery, phone, email, name} = finalAmount;
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.userSignin.userInfo);
  const cart = useSelector(state => state.cart.cart);
  const address = useSelector(state => state.cart.address);
  const shipping = useSelector(state => state.cart.delivery);
  const payment = useSelector(state => state.cart.payment);
  const [selectedPayOption, setSelectedPayOption] = useState('Pay on Delivery');

  let unique = _.uniqWith(cart, _.isEqual);
  const price = unique
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);
  const discount = (price * 5) / 100;
  const total = (
    parseInt(price) +
    parseInt(delivery) -
    parseInt(discount)
  ).toFixed(2);
  const {State, LGA, Bustop, Street} = address;

  const onFinish = () => {
    navigation.goBack();
  };
  const onFini = () => {
    try {
      let order = {
        orderItems: cart,
        shippingAddress: address,
        paymentMethod: payment,
        deliverytMethod: shipping,
        itemsPrice: price,
        shippingPrice: delivery,
        taxPrice: discount,
        isPaid: true,
        totalPrice: total,
        userEmail: email,
        userPhone: phone,
        userName: name,
      };
      dispatch(createOrder(order));
      AlertHelper.show('success', 'Your Order Placed Successfully');
      navigation.navigate('Home');
    } catch (error) {
      AlertHelper.show('error', 'Oops !! Something went wrong !');
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Paystack
        paystackKey="pk_live_265fed5585afd6975af072710503a8f9c385bef0"
        amount={amount}
        billingEmail={email}
        activityIndicatorColor="#BD0F0F"
        onCancel={e => {
          onFinish();
        }}
        onSuccess={res => {
          onFini();
        }}
        autoStart={true}
      />
    </View>
  );
}
