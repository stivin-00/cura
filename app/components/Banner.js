/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, Pressable, Image} from 'react-native';
import {scale} from 'react-native-size-matters';
import {appColors, shadow} from '../utils/appColors';
import CustomButton from '../components/CustomButton';
import img from '../utils/images/clothing.png';

const Banner = ({click}) => {
 
  return (
    <Pressable
      onPress={click}
      style={{
        flex: 1,
        flexDirection: 'row',
        ...shadow,
        height: scale(150),
        paddingHorizontal: scale(20),
        borderRadius: scale(10),
        marginHorizontal: scale(-18),
        marginBottom: scale(15),
        backgroundColor: appColors.lightGreen,
      }}>
      <View
        style={{
          height: scale(150),
          width: scale(110),
          margin: 5,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image resizeMode="contain" style={{height: scale(140)}} source={img} />
      </View>
      <View
        style={{
          height: scale(130),
          width: scale(100),
          margin: 5,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: scale(23),
            color: appColors.primary,
            textAlign: 'center',
          }}>
          shop your wears here at MyCura {'>>'}
        </Text>
      </View>
    </Pressable>
  );
};

export default Banner;
