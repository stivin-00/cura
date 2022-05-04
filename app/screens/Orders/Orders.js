/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';
import {scale} from 'react-native-size-matters';
import {listOrderMine} from '../../redux/orderActions';
import Container from '../../components/Container';
import Label from '../../components/Label';
import {useDispatch, useSelector} from 'react-redux';
import {AlertHelper} from '../../utils/AlertHelper';
import ScreenHeader from '../../components/ScreenHeader';
import {appColors, shadow} from '../../utils/appColors';
import {orderList} from '../../utils/MockData';

export default function Orders({navigation}) {
  const orderMineList = useSelector(state => state.orderMineList);
  const {loading, error, orders} = orderMineList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
    console.log('started');
  }, [dispatch]);
  const userInfo = useSelector(state => state.userSignin.userInfo);
  useEffect(() => {
    console.log(userInfo);
    if (!userInfo) {
      AlertHelper.show('error', 'pls signin');
      navigation.navigate('Login');
    }
  }, [navigation, userInfo]);

  const OrderCard = ({item}) => {
    const {
      _id,
      isDelivered,
      paidAt,
      isPaid,
      totalPrice,
      taxPrice,
      shippingPrice,
      userName,
      userEmail,
      itemsPrice,
      deliverytMethod,
      paymentMethod,
      shippingAddress,
      orderItems,
    } = item;

    return (
      <View style={styles.contentContiner}>
        <View>
          <Label
            text={`id: ${_id}`}
            style={{fontSize: scale(13), color: 'black'}}
          />
          <Label
            text={deliverytMethod}
            style={{fontSize: scale(13), color: 'gray'}}
          />
          <Label
            text={paymentMethod}
            style={{fontSize: scale(13), color: 'gray'}}
          />
          <View
            style={{
              borderBottomColor: 'gray',
              borderBottomWidth: 1,
            }}
          />
          <FlatList
            data={orderItems || []}
            renderItem={({item, index}) => (
              <Text
                item={item}
                // key={index}
                style={{fontSize: scale(12), color: 'gray'}}>
                {item.qty} {item.name} at ₦{item.price}
              </Text>
            )}
          />
          <View
            style={{
              borderBottomColor: 'gray',
              borderBottomWidth: 1,
            }}
          />
          <View>
            <View style={styles.sizeContainer}>
              <Label
                text="Sub Total:"
                style={{fontSize: scale(12), color: 'gray'}}
              />
              <Label
                text={`₦${itemsPrice}`}
                style={{fontSize: scale(12), color: 'gray'}}
              />
            </View>
            <View style={styles.sizeContainer}>
              <Label
                text="Discount:"
                style={{fontSize: scale(12), color: 'gray'}}
              />
              <Label
                text={`₦${taxPrice}`}
                style={{fontSize: scale(12), color: 'gray'}}
              />
            </View>
            <View style={styles.sizeContainer}>
              <Label
                text="Delivery fee:"
                style={{fontSize: scale(12), color: 'gray'}}
              />
              <Label
                text={`₦${shippingPrice}`}
                style={{fontSize: scale(12), color: 'gray'}}
              />
            </View>
            <View style={styles.sizeContainer}>
              <Label
                text="Total:"
                style={{fontSize: scale(12), color: 'gray'}}
              />
              <Label
                text={`₦${totalPrice}`}
                style={{fontSize: scale(12), color: 'gray'}}
              />
            </View>
          </View>
          <View
            style={{
              borderBottomColor: 'gray',
              borderBottomWidth: 1,
            }}
          />
          <Pressable style={isPaid ? styles.paid : styles.notpaid}>
            <Label
              text={isPaid ? 'delivered' : 'in transit'}
              style={{fontSize: scale(14), color: appColors.white}}
            />
          </Pressable>
        </View>
        <View>
          <FlatList
            nestedScrollEnabled
            ItemSeparatorComponent={() => <View style={{padding: scale(2)}} />}
            data={[1, 2, 3, 4]}
            numColumns={2}
            keyExtractor={item => `${item}_${new Date().getTime()}_${item}`}
            renderItem={({item}) => (
              <View
                key={item}
                style={{
                  backgroundColor: appColors.lightGreen,
                  height: scale(35),
                  width: scale(35),
                  marginLeft: scale(4),
                  borderRadius: scale(3),
                }}
              />
            )}
          />
        </View>
      </View>
    );
  };
  return (
    <Container>
      <ScreenHeader navigation={navigation} label="Track Order" />
      <Container isScrollable style={{width: '100%'}}>
        <View
          style={{
            flex: 1,
            paddingVertical: scale(20),
            marginHorizontal: scale(-10),
          }}>
          {loading ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: scale(15), color: 'black'}}>
                loading...
              </Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={item =>
                `${item.label}_${new Date().getTime()}_${item.amount}`
              }
              ItemSeparatorComponent={() => (
                <View style={{padding: scale(1)}} />
              )}
              data={orders}
              renderItem={({item, index}) => (
                <View
                  key={index}
                  item={item}
                  style={{
                    paddingVertical: scale(10),
                    marginHorizontal: scale(-10),
                  }}>
                  <Label
                    text={item.createdAt.substring(0, 10)}
                    style={{
                      opacity: scale(0.5),
                      marginHorizontal: scale(10),
                      fontSize: scale(13),
                    }}
                  />
                  <OrderCard item={item} />
                </View>
              )}
            />
          )}
        </View>
      </Container>
    </Container>
  );
}

const styles = StyleSheet.create({
  contentContiner: {
    paddingVertical: scale(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: appColors.white,
    paddingHorizontal: scale(20),
    ...shadow,
  },
  paid: {
    marginTop: scale(2),
    borderRadius: scale(3),
    width: '80%',
    paddingVertical: scale(10),
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notpaid: {
    marginTop: scale(2),
    borderRadius: scale(3),
    width: '80%',
    paddingVertical: scale(10),
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
