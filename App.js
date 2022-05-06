/* eslint-disable no-undef */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
// Import required components
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import MainStack from './app/routing/MainStack';
import {Provider} from 'react-redux';
// import {StatusBar} from 'react-native';
import store from './app/redux/store';
import 'react-native-gesture-handler';
import DropdownAlert from 'react-native-dropdownalert';
import {AlertHelper} from './app/utils/AlertHelper';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import SplashScreen from 'react-native-splash-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Welcome from './app/screens/Welcome/Welcome';

MaterialIcons.loadFont();
Ionicons.loadFont();
FontAwesome.loadFont();
Feather.loadFont();
MaterialCommunityIcons.loadFont();
const App = () => {
  const [isTrue, setIsTrue] = useState(true);
  // const {persistor, store} = storePre;

  useEffect(() => {
    SplashScreen.hide();
    const timer = setTimeout(() => {
      setIsTrue(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      {/* {navigationTypeTabs ?  */}
      {isTrue ? (
        // <View>
        //   <Text>STIVIN</Text>
        // </View>
        <Welcome />
      ) : (
        // <TabNavigationStack />
        // <View>

        <MainStack />
      )}
      <DropdownAlert
        defaultContainer={{
          padding: 8,
          // paddingTop: StatusBar.currentHeight,
          flexDirection: 'row',
        }}
        ref={ref => AlertHelper.setDropDown(ref)}
        onClose={() => AlertHelper.invokeOnClose()}
        updateStatusBar={false}
      />
      {/* </PersistGate> */}
    </Provider>
  );
};

export default App;
