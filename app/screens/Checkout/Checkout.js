/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import {
  View,
  Text,
  FlatList,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Container from '../../components/Container';
import {bestSellersList} from '../../utils/MockData';
import CheckOutItem from '../../components/CheckOutItem';
import {scale} from 'react-native-size-matters';
import {appColors} from '../../utils/appColors';
import Label from '../../components/Label';
import {AlertHelper} from '../../utils/AlertHelper';
import CustomButton from '../../components/CustomButton';
export default function Checkout({navigation}) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const cart = useSelector(state => state.cart.cart);
  let unique = _.uniqWith(cart, _.isEqual);
  const price = unique
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);
  const discount = (price * 5) / 100;

  const userSignin = useSelector(state => state.userSignin);
  const {userInfo, loading, error} = userSignin;

  useEffect(() => {
    console.log(userInfo);
    if (!userInfo) {
      AlertHelper.show('error', 'pls signin');
      navigation.navigate('Login');
    }
  }, [navigation, userInfo]);

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <Container
        isScrollable
        bodyStyle={{
          flex: 1,
          paddingHorizontal: scale(0),
          paddingVertical: scale(20),
        }}>
        <View
          style={{paddingHorizontal: scale(20), paddingVertical: scale(20)}}>
          <ScrollView horizontal={true} style={{width: '100%'}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={unique}
              ItemSeparatorComponent={() => (
                <View style={{padding: scale(10)}} />
              )}
              renderItem={({item, index}) => (
                <CheckOutItem
                  noBg
                  name={item.name}
                  image={item.image}
                  price={item.price}
                  qty={item.qty}
                />
              )}
            />
          </ScrollView>
        </View>
      </Container>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          height: '35%',
          // alignItems: 'center',
          paddingHorizontal: scale(1),
        }}>
        <View
          style={{
            borderColor: appColors.lightGray,
            /*  bottom:scale(130),  */ borderBottomWidth: scale(2),
            borderTopWidth: scale(2),
          }}>
          <View
            style={{
              paddingVertical: scale(8),
              paddingHorizontal: scale(20),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Label
              text="Sub Total"
              style={{fontWeight: '400', fontSize: scale(18)}}
            />
            <View
              style={{
                borderRadius: scale(1),
                borderWidth: scale(0.5),
                borderStyle: 'dashed',
                width: '40%',
              }}
            />
            <Label text={`₦${price}`} style={{fontWeight: '800'}} />
          </View>

          <View
            style={{
              paddingVertical: scale(8),
              paddingHorizontal: scale(20),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Label
              text="Discount"
              style={{fontWeight: '400', fontSize: scale(18)}}
            />
            <View
              style={{
                borderRadius: scale(1),
                borderWidth: scale(0.5),
                borderStyle: 'dashed',
                width: '40%',
              }}
            />
            <Label
              text={`₦${discount.toFixed(2)}`}
              style={{fontWeight: '800'}}
            />
          </View>
        </View>
        <View style={{flex: 1, paddingHorizontal: scale(20)}}>
          <View
            style={{
              borderRadius: scale(5),
              marginTop: scale(20),
              borderColor: appColors.lightGray,
              borderWidth: scale(1),
              paddingHorizontal: scale(20),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: scale(50),
            }}>
            <TextInput
              placeholderTextColor={'#808080'}
              placeholder="Enter Voucher Code"
              style={{flex: 1, fontSize: scale(16), color: 'black'}}
            />
            <Label text="APPLY" />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingHorizontal: scale(5),
          }}>
          <CustomButton
            label="CHECKOUT"
            onPress={() => navigation.navigate('CheckOutSteper')}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
