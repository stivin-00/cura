/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, BackHandler} from 'react-native';
import {scale} from 'react-native-size-matters';
import Container from '../../components/Container1';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import Label from '../../components/Label';
import {appColors, shadow} from '../../utils/appColors';
import auth from '@react-native-firebase/auth';
import {signin} from '../../redux/authAction';
import {AlertHelper} from '../../utils/AlertHelper';
import {CommonActions} from '@react-navigation/native';

import googleLogin from '../../services/googleLogin';
import writeData from '../../utils/writeData';
import ReduxWrapper from '../../utils/ReduxWrapper';
import {useDispatch, useSelector} from 'react-redux';

function Login({getProductsList$, loginUser$, navigation}) {
  const [credentials, setCredentials] = useState({});
  const [isloading, setisloading] = useState(false);

  const dispatch = useDispatch();

  const userSignin = useSelector(state => state.userSignin);
  const {userInfo, loading, error} = userSignin;

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
      AlertHelper.show('success', 'Welcome to Jumstore');
      navigation.goBack();
    }
  }, [getProductsList$, navigation, userInfo]);

  const onLogin = async () => {
    console.log('signin');
    const {email, password} = credentials;

    try {
      if (email && password) {
        dispatch(signin(email?.toLowerCase(), password?.toLowerCase()));

        if (userInfo) {
          AlertHelper.show('success', 'Welcome to Jumstore');
          navigation.goBack();
        }
      } else {
        setisloading(false);
        AlertHelper.show('error', 'Email and password is required!!');
      }
    } catch (error) {
      AlertHelper.show('error', 'check email and password');
    }
  };

  const onChangeText = (name, text) => {
    setCredentials({...credentials, [name]: text});
  };

  return (
    <Container isScrollable>
      <View
        style={{
          marginTop: scale(50),
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
            text="Welcome,"
            style={{fontSize: scale(30), fontWeight: '700'}}
          />
          <Pressable onPress={() => navigation.navigate('SignUp')}>
            <Label
              text="Sign Up"
              style={{
                fontSize: scale(14),
                fontWeight: '500',
                color: appColors.primary,
              }}
            />
          </Pressable>
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
        <View style={{paddingVertical: scale(10)}}>
          <CustomInput
            onChangeText={text => onChangeText('email', text)}
            keyboardType="email-address"
            label="Email"
            placeholder="john@doe.com"
          />
        </View>
        <View style={{paddingVertical: scale(10)}}>
          <CustomInput
            onChangeText={text => onChangeText('password', text)}
            secureTextEntry
            label="Password"
            placeholder="Password"
            // value="*******"
          />
        </View>
        <Pressable
          onPress={() => navigation.navigate('Verification')}
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingVertical: scale(10),
          }}>
          <Label
            text="Forgot password"
            style={{
              fontSize: scale(14),
              // fontWeight: '500',
            }}
          />
        </Pressable>
        <CustomButton isLoading={isloading} onPress={onLogin} label="Sign in" />
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: scale(20),
        }}>
        <Label
          text="-OR-"
          style={{
            fontSize: scale(18),
            //fontWeight: '500',
          }}
        />
      </View>
      {/* <CustomButton
        onPress={onGoogleLogin}
        icon="google"
        label="Sign in"
        unFilled
      /> */}
      {/* <CustomButton onPress={onLogin} icon="twitter" label="Sign in" unFilled /> */}
    </Container>
  );
}

export default ReduxWrapper(Login);
