/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Pressable, Image} from 'react-native';
import {scale} from 'react-native-size-matters';
import {appColors, shadow} from '../utils/appColors';
import {AirbnbRating} from 'react-native-ratings';
import Label from './Label';

export default function ProductCardHorizontal({navigation, item}) {
  const {name, description, price, image, rating} = item;
  //console.log({item});
  return (
    <Pressable
      onPress={() => navigation.navigate('ProductDetails', {item})}
      style={{
        ...shadow,
        backgroundColor: appColors.white,
        height: scale(100),
        marginHorizontal: scale(1),
        borderRadius: 3,
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}>
      <View
        style={{
          height: scale(95),
          width: scale(110),
          margin: 5,
          paddingLeft: scale(20),
          flex: 0.3,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          resizeMode="contain"
          style={{height: scale(95), width: scale(110)}}
          source={{uri: image.url}}
        />
      </View>
      <View
        style={{
          height: scale(130),
          // width: scale(110),
          margin: 5,
          paddingLeft: scale(20),
          flex: 0.65,
          justifyContent: 'center',
          // alignItems: 'center',
        }}>
        <View style={{paddingVertical: scale(3)}}>
          <Label
            text={name?.substring(0, 20)}
            style={{fontSize: scale(13), fontWeight: '500', marginLeft: 2}}
          />
        </View>
        <View style={{paddingVertical: scale(3)}}>
          <Label
            text={`₦${price}`}
            style={{
              fontSize: scale(15),
              color: 'b#000000',
              fontWeight: '500',
              marginLeft: 2,
            }}
          />
        </View>

        <View style={{paddingVertical: scale(2)}}>
          <Label
            text={description?.substring(0, 24)}
            style={{
              fontSize: scale(13),
              marginLeft: 2,
              color: appColors.darkGray,
            }}
          />
        </View>
        <View
          style={{
            paddingVertical: scale(2),
            flexDirection: 'row',
            // justifyContent: 'center',
            // alignItems: 'start',
          }}>
          <AirbnbRating
            size={15}
            // imageSize={45}
            count={5}
            defaultRating={rating}
            isDisabled
            showRating={false}
            selectedColor={appColors.yellow}
            style={{paddingRight: scale(100)}}
          />
        </View>
      </View>
    </Pressable>
  );
}
