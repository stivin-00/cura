/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import {appColors, shadow} from '../../utils/appColors';
import _ from 'lodash';
import {createOrder} from '../../redux/orderActions';
import {scale} from 'react-native-size-matters';
import Container from '../../components/Container';
import ScreenHeader from '../../components/ScreenHeader';
import SelectAble from '../../components/SelectAble';
import Divider from '../../components/Divider';
import CustomButton from '../../components/CustomButton';
import ProductCard from '../../components/ProductCard';
import {bestSellersList} from '../../utils/MockData';
import TitleComp from '../../components/TitleComp';
import Feather from 'react-native-vector-icons/Feather';
import CheckBox from '../../components/CheckBox';
import {useDispatch, useSelector} from 'react-redux';
import Label from '../../components/Label';
import {AlertHelper} from '../../utils/AlertHelper';
import paymentHelper from '../../services/paymentHelper';
import ReduxWrapper from '../../utils/ReduxWrapper';

function Summary(props) {
  const {
    // auth: {user},
    navigation,
  } = props;
  const finalAmount = useSelector(state => state.cart.final);
  const {amount, phone, delivery, email, name} = finalAmount;
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
    parseInt(price) -
    parseInt(discount) +
    parseInt(delivery)
  ).toFixed(2);
  const {State, LGA, Bustop, Street} = address;

  useEffect(() => {
    console.log(userInfo);
    if (!userInfo) {
      AlertHelper.show('error', 'pls signin');
      navigation.navigate('Login');
    }
  }, [navigation, userInfo]);

  const onPaymentDone = info => {
    const {error} = info;
    if (!error) {
      AlertHelper.show('success', 'Your Order Placed Successfully');
      navigation.navigate('Home');
    } else {
      AlertHelper.show('error', 'Oops !! Something went wrong !');
    }
  };
  const onPay = async () => {
    try {
      let order = {
        orderItems: cart,
        shippingAddress: address,
        paymentMethod: payment,
        deliverytMethod: shipping,
        itemsPrice: price,
        shippingPrice: delivery,
        taxPrice: discount,
        isPaid: false,
        totalPrice: total,
        userEmail: email,
        userPhone: phone,
        userName: name,
      };
      dispatch(createOrder(order));
      // AlertHelper.show('success', 'Your Order Placed Successfully');
      navigation.navigate('Home');
    } catch (error) {
      AlertHelper.show('error', 'Oops !! Something went wrong !');
      console.log(error);
    }
  };
  return (
    <>
      <Container isScrollable>
        <ScreenHeader label="Summary" navigation={navigation} />
        <Divider isDark />
        <View>
          {/* <Label>shipping</Label> */}
          <View style={styles.container}>
            <Text style={{fontSize: scale(15), color: 'black'}}>
              ADDRESS INFO
            </Text>
            <Text style={{fontSize: scale(12), color: 'gray'}}>{name}</Text>
            <Text style={{fontSize: scale(12), color: 'gray'}}>{shipping}</Text>
            <Text style={{fontSize: scale(12), color: 'gray'}}>
              {Street} street
            </Text>
            <Text style={{fontSize: scale(12), color: 'gray'}}>
              {Bustop} bustop
            </Text>
            <Text style={{fontSize: scale(12), color: 'gray'}}>{LGA} lga</Text>
            <Text style={{fontSize: scale(12), color: 'gray'}}>
              {State} state
            </Text>
            <Text style={{fontSize: scale(12), color: 'gray'}}>{email}</Text>
          </View>
        </View>
        <Divider isDark />
        <View>
          <View style={styles.container}>
            <Text style={{fontSize: scale(15), color: 'black'}}>
              SHIPPING INFO
            </Text>
            <ScrollView horizontal={true} style={{width: '100%'}}>
              <FlatList
                data={unique || []}
                renderItem={({item, index}) => (
                  <Text
                    item={item}
                    // key={index}
                    style={{fontSize: scale(12), color: 'gray'}}>
                    {item.qty} {item.name} at ₦{item.price} per {item.size}
                  </Text>
                )}
              />
            </ScrollView>
          </View>
        </View>

        <Divider isDark />
        <View style={styles.container}>
          <View>
            <Text style={{fontSize: scale(15), color: 'black'}}>
              PAYMENT INFO
            </Text>
            <View style={styles.sizeContainer}>
              <Label
                text="Sub Total:"
                style={{fontSize: scale(12), color: 'gray'}}
              />
              <Label
                text={`₦${price}`}
                style={{fontSize: scale(12), color: 'gray'}}
              />
            </View>
            <View style={styles.sizeContainer}>
              <Label
                text="Discount:"
                style={{fontSize: scale(12), color: 'gray'}}
              />
              <Label
                text={`₦${discount}`}
                style={{fontSize: scale(12), color: 'gray'}}
              />
            </View>
            <View style={styles.sizeContainer}>
              <Label
                text="Delivery fee:"
                style={{fontSize: scale(12), color: 'gray'}}
              />
              <Label
                text={`₦${delivery}`}
                style={{fontSize: scale(12), color: 'gray'}}
              />
            </View>
            <View style={styles.sizeContainer}>
              <Label
                text="Total:"
                style={{fontSize: scale(12), color: 'gray'}}
              />
              <Label
                text={`₦${total}`}
                style={{fontSize: scale(12), color: 'gray'}}
              />
            </View>
          </View>
        </View>

        <Divider isDark />
      </Container>
      <View
        style={{
          width: '80%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: scale(10),
          bottom: scale(10),
        }}>
        {/* <CustomButton
          onPress={() => navigation.goBack()}
          label="back"
          unFilled
        /> */}
        <CustomButton onPress={onPay} label="Place Order" />
      </View>
    </>
  );
}

export default ReduxWrapper(Summary);

const styles = StyleSheet.create({
  sizeContainer: {
    flex: 0.47,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scale(5),
    backgroundColor: appColors.white,
    // padding: scale(10),
    paddingHorizontal: scale(10),
    // borderRadius: scale(20),
    // borderWidth: scale(0.4),
    // borderColor: appColors.gray,
  },
  itemColor: {
    height: scale(20),
    width: scale(20),
    backgroundColor: appColors.primary,
    borderRadius: scale(5),
  },
  wrtitle: {
    paddingVertical: scale(10),
    fontSize: scale(14),
    color: appColors.primary,
  },
  container: {
    width: '100%',
    marginTop: scale(10),
    ...shadow,
    backgroundColor: appColors.white,
    paddingVertical: 5,
    paddingHorizontal: scale(10),
    borderRadius: 3,
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
