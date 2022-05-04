/* eslint-disable react-hooks/exhaustive-deps */
import {USER_SIGNIN_SUCCESS} from '../../redux/authAction';
import {ADD_TO_CART} from '../../redux/constants/cartConstants';
import {CARTT_ADD_ITEM} from '../../redux/constants/cartConstants';
//   // useEffect(() => {
//   //   const timer = setTimeout(() => {
//   //     if (userInfo) {
//   //       navigation.navigate('Home');
//   //     } else {
//   //       navigation.navigate('Home');
//   //     }
//   //   }, 2000);
//   //   return () => clearTimeout(timer);
//   // }, [navigation, userInfo]);

//   // const changeRoute = () => {
//   //   if (user) {
//   //     navigation.navigate('Home');
//   //   } else {
//   //     navigation.navigate('Home');
//   //   }
//   //   if (initializing) {
//   //     setInitializing(false);
//   //   }
//   // };

//   return (
//     <View style={styles.container}>
//       <Text>Welcome to jumstore</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fffff0',
//   },
// });

// Example of Animation Splash Screen with Zoom Effect
// https://aboutreact.com/animation-splash-screen-with-zoom-effect/

// Import React
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text, StatusBar, StyleSheet, Image, Animated} from 'react-native';

const logoApp = require('../../utils/images/cura.png');

const App = ({navigation}) => {
  const width = new Animated.Value(20);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const height = new Animated.Value(20);
  const dispatch = useDispatch();

  // const importData = async () => {
  //   try {
  //     const userInfo = await AsyncStorage.getItem('userInfo');
  //     dispatch({type: USER_SIGNIN_SUCCESS, payload: userInfo});
  //     console.log('all data=>', userInfo);
  //   } catch (error) {
  //     console.log(error, 'problemo');
  //   }
  // };
  const getData = () => {
    try {
      AsyncStorage.getItem('userInfo').then(value => {
        if (value != null) {
          let usert = JSON.parse(value);
          dispatch({type: USER_SIGNIN_SUCCESS, payload: usert});
          console.log(usert);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getCart = () => {
    try {
      AsyncStorage.getItem('cartItems').then(value => {
        if (value != null) {
          let cart = JSON.parse(value);
          console.log('cart', cart);
          dispatch({type: ADD_TO_CART, payload: cart});
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    getCart();
  }, []);

  useEffect(() => {
    Animated.timing(
      width, // The animated value to drive
      {
        toValue: 200, // Animate to opacity: 1 (opaque)
        duration: 1000, // Make it take a while
        useNativeDriver: false,
      },
    ).start(); // Starts the animation
    Animated.timing(
      height, // The animated value to drive
      {
        toValue: 100, // Animate to opacity: 1 (opaque)
        duration: 1000, // Make it take a while
        useNativeDriver: false,
      },
    ).start(); // Starts the animation
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height, width]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="#BD0F0F"
        zIndex={2}
        backgroundColor="rgb(250, 250, 250)"
        translucent={true}
        animated={true}
      />
      <Animated.Image
        source={logoApp}
        style={{
          width: width,
          height: height,
          position: 'absolute',
        }}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '	rgb(250, 250, 250)',
  },
  logo: {
    width: 100,
    height: 100,
  },
});
