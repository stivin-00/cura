import axios from 'axios';
import {AlertHelper} from '../utils/AlertHelper';
// import Realm from 'realm';
// import User from './models';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const USER_SIGNIN_REQUEST = 'USER_SIGNIN_REQUEST'; // ACTION TYPE
export const USER_SIGNIN_FAIL = 'USER_SIGNIN_FAIL'; // ACTION TYPE
export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST'; // ACTION TYPE
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS'; // ACTION TYPE
export const USER_REGISTER_FAIL = 'USER_REGISTER_FAIL'; // ACTION TYPE
export const USER_SIGNIN_SUCCESS = 'USER_SIGNIN_SUCCESS'; // ACTION TYPE
export const USER_SIGNOUT = 'USER_SIGNOUT'; // ACTION TYPE

// const realm = await Realm.open({
//   path: 'myrealm',
//   schema: [userSchema],
// });
// const storeData = async value => {
//   try {
//     const jsonValue = JSON.stringify(value);
//     await AsyncStorage.setItem('userInfo', jsonValue);
//   } catch (e) {
//     // saving error
//   }
// };
const clLocal = () => {
  AsyncStorage.getAllKeys().then(keys => AsyncStorage.multiRemove(keys));
};

export const signin = (email, password) => async dispatch => {
  dispatch({type: USER_SIGNIN_REQUEST, payload: {email, password}});
  console.log(email, password);
  try {
    const {data} = await axios.post(
      'https://jumstore-store.herokuapp.com/api/users/signin',
      {
        email,
        password,
      },
    );
    dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
    await AsyncStorage.setItem('userInfo', JSON.stringify(data));
    console.log(data);
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    console.log(error);
    AlertHelper.show('error', 'check email and password');
  }
};

export const register = (name, email, phone, password) => async dispatch => {
  dispatch({
    type: USER_REGISTER_REQUEST,
    payload: {name, email, phone, password},
  });
  try {
    const {data} = await axios.post(
      'https://jumstore-store.herokuapp.com/api/users/register',
      {
        name,
        email,
        phone,
        password,
      },
    );
    dispatch({type: USER_REGISTER_SUCCESS, payload: data});
    AlertHelper.show('success', 'Signup Success, Welcome to jumstore');
    dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
    await AsyncStorage.setItem('userInfo', JSON.stringify(data));
    console.log(data);
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    console.log(error.response);
    AlertHelper.show('error', error.message);
  }
};

export const signout = () => async dispatch => {
  // AsyncStorage.removeItem('userInfo');
  // localStorage.removeItem('cartItems');
  clLocal();
  await AsyncStorage.clear();
  dispatch({type: USER_SIGNOUT});
};
