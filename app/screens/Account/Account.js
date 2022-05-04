/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useEffect} from 'react';
import {signout} from '../../redux/authAction';
import {View, Text, StyleSheet, Pressable, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {scale} from 'react-native-size-matters';
import Container from '../../components/Container';
import Feather from 'react-native-vector-icons/Feather';
import {appColors, shadow} from '../../utils/appColors';
import Label from '../../components/Label';
import {useDispatch, useSelector} from 'react-redux';
import {AlertHelper} from '../../utils/AlertHelper';
import {profileKeys} from '../../utils/MockData';
import AvatarImage from '../../components/AvatarImage';
const img = require('../../utils/images/profile.png');

export default function Account({navigation}) {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.userSignin.userInfo);
  useEffect(() => {
    console.log(userInfo);
    if (!userInfo) {
      AlertHelper.show('error', 'pls signin');
      navigation.navigate('Login');
    }
  }, [navigation, userInfo]);


  const logOut = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
      dispatch(signout());
      await AsyncStorage.clear();
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setUser(userInfo);
    console.log('haasd=>', user);
  }, [user, userInfo]);

  const ItemCard = ({item}) => {
    const {lebel, icon, isNew, route} = item;
    return (
      <Pressable
        onPress={() => {
          navigation.navigate(route);
        }}
        style={styles.itemContainer}>
        <Pressable style={styles.iconContainer}>
          <Feather name={icon} size={scale(22)} color={appColors.black} />
        </Pressable>
        <View style={styles.itemInnerContainer}>
          <Label text={lebel} />
          {isNew && (
            <View
              style={{
                paddingHorizontal: scale(10),
                backgroundColor: appColors.red,
                padding: scale(5),
                borderRadius: scale(4),
              }}>
              <Label
                text="New"
                style={{fontSize: scale(10), color: appColors.white}}
              />
            </View>
          )}
          <Feather
            name={'chevron-right'}
            size={scale(18)}
            color={appColors.black}
          />
        </View>
      </Pressable>
    );
  };
  return (
    <Container>
      {user ? (
        <View
          style={{
            paddingVertical: scale(20),
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <AvatarImage size={scale(110)} />
          <View style={{marginLeft: scale(20)}}>
            <Label text={user.name} style={{fontSize: scale(28)}} />
            <Label text={user.email} style={{fontSize: scale(14)}} />
          </View>
        </View>
      ) : (
        <View
          style={{
            paddingVertical: scale(20),
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <AvatarImage size={scale(110)} />
          <View style={{marginLeft: scale(20)}}>
            <Label text="stivin" style={{fontSize: scale(28)}} />
            <Label text="stivin@gmail.com" style={{fontSize: scale(14)}} />
          </View>
        </View>
      )}
      <FlatList
        data={profileKeys}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => <ItemCard key={index} item={item} />}
      />
      {user ? (
        <Pressable onPress={logOut} style={styles.itemContainer}>
          <Pressable style={styles.iconContainer}>
            <Feather
              name={'log-out'}
              size={scale(22)}
              color={appColors.black}
            />
          </Pressable>
          <View style={styles.itemInnerContainer}>
            <Label text="Sign Out" />

            <Feather
              name={'chevron-right'}
              size={scale(18)}
              color={appColors.black}
            />
          </View>
        </Pressable>
      ) : (
        <Pressable onPress={logOut} style={styles.itemContainer}>
          <Pressable style={styles.iconContainer}>
            <Feather name={'log-in'} size={scale(22)} color={appColors.black} />
          </Pressable>
          <View style={styles.itemInnerContainer}>
            <Label text="Sign In" />

            <Feather
              name={'chevron-right'}
              size={scale(18)}
              color={appColors.black}
            />
          </View>
        </Pressable>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    ...shadow,
    backgroundColor: '#EDF4F5.',
    paddingVertical: scale(15),
    paddingHorizontal: scale(15),
    marginVertical: scale(5),
    borderRadius: scale(15),
  },
  itemInnerContainer: {
    flex: 1,

    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconContainer: {
    borderRadius: scale(5),
    padding: scale(10),
    marginRight: scale(20),
    backgroundColor: appColors.lightGreen,
  },
});
