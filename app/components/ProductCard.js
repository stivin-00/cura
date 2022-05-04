/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Pressable, Image} from 'react-native';
import {scale} from 'react-native-size-matters';
import {AirbnbRating} from 'react-native-ratings';
import {appColors, shadow} from '../utils/appColors';
import Label from './Label';

export default function ProductCard({navigation, item}) {
  const {name, description, price, image, rating} = item;
  //console.log({item});
  return (
    <Pressable
      onPress={() => navigation.navigate('ProductDetails', {item})}
      style={{
        width: scale(130),
        ...shadow,
        backgroundColor: appColors.white,
        marginVertical: 5,
        marginHorizontal: scale(1),
        borderRadius: 3,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          height: scale(130),
          width: scale(110),
          margin: 5,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          resizeMode="contain"
          style={{height: scale(105), width: scale(110)}}
          // source={{uri: `https://jumstore-store.herokuapp.com${image}`}}
          source={{uri: image.url}}
        />
      </View>

      <View style={{width: scale(110)}}>
        <View style={{paddingVertical: scale(3)}}>
          <Label
            text={name?.substring(0, 20)}
            style={{fontSize: scale(13), fontWeight: '500', marginLeft: 2}}
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
            size={12}
            // imageSize={45}
            count={5}
            defaultRating={rating}
            isDisabled
            showRating={false}
            selectedColor={appColors.yellow}
          />
        </View>
        <View style={{paddingVertical: scale(2)}}>
          <Label
            text={`${description?.substring(0, 15)}...`}
            style={{
              fontSize: scale(13),
              marginLeft: 2,
              color: appColors.darkGray,
            }}
          />
        </View>

        <View style={{paddingVertical: scale(3)}}>
          <Label
            text={`₦${price}`}
            style={{
              fontSize: scale(15),
              color: '#000000',
              fontWeight: '500',
              marginLeft: 2,
            }}
          />
        </View>
      </View>
    </Pressable>
  );
}
