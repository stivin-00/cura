/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import Container from '../../components/Container';
import _ from 'lodash';
import {finalAmount} from '../../redux/cartActions';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import {scale} from 'react-native-size-matters';
import {appColors, shadow} from '../../utils/appColors';
import {paymentType} from '../../redux/cartActions';
import SelectAble from '../../components/SelectAble';
import {payTypes} from '../../utils/MockData';
import Label from '../../components/Label';

export default function CheckoutPayOption({navigation}) {
  const [user, setUser] = useState({});
  const [deliveryPrice, setDeliveryPrice] = useState(200);
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.userSignin.userInfo);
  const cart = useSelector(state => state.cart.cart);
  const address = useSelector(state => state.cart.address);
  const shipping = useSelector(state => state.cart.delivery);
  const [selectedPayOption, setSelectedPayOption] = useState(
    'Pay Now (with card)',
  );

  let unique = _.uniqWith(cart, _.isEqual);
  const price = unique
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);
  const discount = (price * 5) / 100;
  const total = (parseInt(price) - parseInt(discount) + deliveryPrice).toFixed(
    2,
  );
  const {State, LGA, Bustop, Street} = address;

  const getDeliveryPrice = () => {
    if (State === 'Abia') {
      setDeliveryPrice(3500);
    } else {
      if (State === 'Lagos') {
        setDeliveryPrice(1500);
      } else {
        if (State === 'Oyo') {
          setDeliveryPrice(2000);
        } else {
          if (State === 'Rivers') {
            setDeliveryPrice(4000);
          } else {
            if (State === 'Ogun') {
              setDeliveryPrice(2000);
            } else {
              if (State === 'Osun') {
                setDeliveryPrice(3000);
              } else {
                if (State === 'Ondo') {
                  setDeliveryPrice(3000);
                } else {
                  if (State === 'Ekiti') {
                    setDeliveryPrice(3000);
                  } else {
                    if (State === 'Delta') {
                      setDeliveryPrice(2500);
                    } else {
                      if (State === 'Edo') {
                        setDeliveryPrice(2500);
                      } else {
                        if (State === 'Imo') {
                          setDeliveryPrice(3500);
                        } else {
                          if (State === 'Enugu') {
                            setDeliveryPrice(3500);
                          } else {
                            if (State === 'Anambra') {
                              setDeliveryPrice(3500);
                            } else {
                              if (State === 'Ebonyi') {
                                setDeliveryPrice(3500);
                              } else {
                                if (State === 'Akwa-Ibom') {
                                  setDeliveryPrice(4000);
                                } else {
                                  if (State === 'Cross-River') {
                                    setDeliveryPrice(4000);
                                  } else {
                                    if (State === 'Kogi') {
                                      setDeliveryPrice(4500);
                                    } else {
                                      if (
                                        State === 'Federal Capital Territory'
                                      ) {
                                        setDeliveryPrice(3000);
                                      } else {
                                        setDeliveryPrice(5000);
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  const onSelect = item => {
    setSelectedPayOption(item.label);
    dispatch(paymentType(item.label));
  };

  const saveData = () => {
    let data = {
      email: user.email,
      name: user.name,
      phone: user.phone,
      amount: total,
      delivery: deliveryPrice,
    };
    dispatch(finalAmount(data));
  };
  useEffect(() => {
    setUser(userInfo);
    getDeliveryPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  useEffect(() => {
    const timer = setTimeout(() => {
      saveData();
    }, 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  return (
    <Container isScrollable style={{flex: 1, flexDirection: 'column'}}>
      <View
        style={{
          flex: 1,
          marginHorizontal: scale(-10),
          marginVertical: scale(10),
          // backgroundColor: '#808080',
        }}>
        <View>
          {/* <Label>shipping</Label> */}
          <View style={styles.container}>
            <Text style={{fontSize: scale(15), color: 'black'}}>
              ADDRESS INFO
            </Text>
            <Text style={{fontSize: scale(12), color: 'gray'}}>
              {user.name}
            </Text>
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
            <Text style={{fontSize: scale(12), color: 'gray'}}>
              {user.email}
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.container}>
            <Text style={{fontSize: scale(15), color: 'black'}}>
              SHIPPING INFO
            </Text>
            <ScrollView horizontal={true}>
              <FlatList
                data={unique || []}
                renderItem={({item, index}) => (
                  <Text
                    item={item}
                    // key={index}
                    style={{fontSize: scale(12), color: 'gray'}}>
                    {item.qty} {item.size} {item.name} at ₦{item.price} per 1
                  </Text>
                )}
              />
            </ScrollView>
          </View>
        </View>

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
                text={`₦${deliveryPrice}`}
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
      </View>
      <ScrollView horizontal={true}>
        <View style={styles.container}>
          <FlatList
            data={payTypes}
            renderItem={({item, index}) => (
              <SelectAble
                selected={selectedPayOption === item.label}
                onSelect={onSelect}
                item={item}
                key={index}
              />
            )}
          />
        </View>
      </ScrollView>
    </Container>
  );
}
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
