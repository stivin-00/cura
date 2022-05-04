import {View, Text, Image} from 'react-native';
import React from 'react';
import TouchableRipple from 'react-native-touch-ripple';
import {appColors} from '../utils/appColors';
import Label from './Label';
import {scale} from 'react-native-size-matters';
const img = require('../utils/images/sammy-38.png');

export default function Empty({label, navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {label && (
        <Label
          style={{fontSize: scale(23), paddingVertical: scale(20)}}
          text={label}
        />
      )}
      <TouchableRipple
        rippleColor={appColors.primary}
        rippleContainerBorderRadius={scale(40)}
        rippleDuration={800}
        onPress={() => console.log('Home')}>
        <Image
          resizeMode="contain"
          style={{height: scale(350), width: scale(350)}}
          source={img}
        />
      </TouchableRipple>
    </View>
  );
}
