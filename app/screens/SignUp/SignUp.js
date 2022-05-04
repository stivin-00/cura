/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, BackHandler} from 'react-native';
import {scale} from 'react-native-size-matters';
import Container from '../../components/Container1';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import Label from '../../components/Label';
import {appColors, shadow} from '../../utils/appColors';
import Feather from 'react-native-vector-icons/Feather';
import {register} from '../../redux/authAction';
// import auth from '@react-native-firebase/auth';
import {AlertHelper} from '../../utils/AlertHelper';
import {useDispatch, useSelector} from 'react-redux';

export default function SignUp({navigation}) {
  const [userInfoi, setUserInfoi] = useState({});
  const dispatch = useDispatch();
  const onChnage = (name, text) => {
    setUserInfoi({...userInfoi, [name]: text});
  };
  const userRegister = useSelector(state => state.userRegister);
  const {userInfo, loading, error} = userRegister;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    console.log(userInfo);
    if (userInfo) {
      AlertHelper.show('success', 'you are signed in');
      navigation.goBack();
    }
  }, [navigation, userInfo, dispatch]);

  const onSignUp = async () => {
    const {name, email, phone, password} = userInfoi;
    dispatch(register(name, email, phone, password));
    // if (userInfo) {
    //   AlertHelper.show('success', 'Signup Success, Welcome to jumstore');
    //   navigation.navigate('Home');
    // } else {
    //   AlertHelper.show('error', 'Signup Failed, Please Retry');
    // }
  };
  return (
    <Container isScrollable backgroundColor={appColors.primary}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={{marginTop: scale(30)}}>
        <Feather name={'chevron-left'} size={scale(25)} />
      </Pressable>
      <View
        style={{
          marginTop: scale(70),
          backgroundColor: appColors.white,
          ...shadow,
          padding: scale(15),
          borderRadius: scale(5),
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <Label
            text="Sign Up"
            style={{fontSize: scale(30), fontWeight: '700'}}
          />
        </View>
        <View style={{paddingVertical: scale(15)}}>
          <Label
            text="Sign in to Continue"
            style={{
              fontSize: scale(16),
              //fontWeight: '500',
              color: appColors.darkGray,
            }}
          />
        </View>
        <View style={{paddingVertical: scale(7)}}>
          <CustomInput
            onChangeText={text => onChnage('name', text)}
            label="Name"
            placeholder="stivin"
          />
        </View>
        <View style={{paddingVertical: scale(7)}}>
          <CustomInput
            onChangeText={text => onChnage('email', text)}
            keyboardType="email-address"
            label="Email"
            placeholder="john@doe.com"
          />
        </View>
        <View style={{paddingVertical: scale(7)}}>
          <CustomInput
            onChangeText={text => onChnage('phone', text)}
            keyboardType="number"
            label="Phone"
            placeholder="john@doe.com"
          />
        </View>
        <View style={{paddingVertical: scale(7)}}>
          <CustomInput
            onChangeText={text => onChnage('password', text)}
            secureTextEntry
            label="Password"
            placeholder="Password"
          />
        </View>
        <CustomButton onPress={onSignUp} label="Sign up" />
      </View>
    </Container>
  );
}
