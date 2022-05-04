/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import {scale} from 'react-native-size-matters';
import CheckOutItem from '../../components/CheckOutItem';
import Container from '../../components/Container';
import ScreenHeader from '../../components/ScreenHeader';
import Label from '../../components/Label';
import {useDispatch, useSelector} from 'react-redux';
import {AlertHelper} from '../../utils/AlertHelper';
import {appColors} from '../../utils/appColors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {bestSellersList} from '../../utils/MockData';

export default function WishList({navigation}) {
  const [data, setData] = useState({});
  const userInfo = useSelector(state => state.userSignin.userInfo);
  useEffect(() => {
    console.log(userInfo);
    if (!userInfo) {
      AlertHelper.show('error', 'pls signin');
      navigation.navigate('Login');
    }
  }, [navigation, userInfo]);

  //   useEffect(() => {
  //     try {
  //       AsyncStorage.getItem('wishlist').then(value => {
  //         if (value != null) {
  //           console.log(value);
  //           let wish = JSON.parse(value);
  //           setData(wish);
  //           console.log(wish);
  //         }
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        AsyncStorage.getItem('wishlist').then(value => {
          if (value != null) {
            console.log(value);
            let wish = JSON.parse(value);
            setData(wish);
            console.log(wish);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const renderBagge = () => {
    return (
      <View
        style={{
          backgroundColor: appColors.primary,
          padding: scale(10),
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: scale(3),
        }}>
        <Label
          text="In Stock"
          style={{fontSize: scale(10), color: appColors.white}}
        />
      </View>
    );
  };
  return (
    <Container>
      <ScreenHeader label="WishList" />
      <FlatList
        ItemSeparatorComponent={() => <View style={{padding: scale(10)}} />}
        data={data}
        renderItem={({item, index}) => (
          <CheckOutItem noBg hideSteper renderBagge={renderBagge} {...item} />
        )}
      />
    </Container>
  );
}
