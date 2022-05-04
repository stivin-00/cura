/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Pressable, TextInput, Image} from 'react-native';
import {scale} from 'react-native-size-matters';
import {appColors} from '../utils/appColors';

const searchIcon = require('../utils/images/icon.png');
const searchCamera = require('../utils/images/curaicon.png');

export default function SearchBox({
  autoFocus,
  value,
  onChangeText,
  secureTextEntry,
  onFoucs,
  hideCamra,
  onRightIconPress,
  rightIcon,
}) {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
        marginHorizontal: scale(-19),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f7fa',
      }}>
      <View>
        <Pressable
          onPress={onRightIconPress && onRightIconPress}
          style={{
            borderRadius: scale(20),
            width: scale(40),
            height: scale(40),
            backgroundColor: appColors.white,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: scale(20),
          }}>
          <Image
            resizeMode="contain"
            style={{
              height: scale(30),
              width: scale(40),
            }}
            source={searchCamera}
          />
        </Pressable>
      </View>
      <View
        style={{
          flex: 1,
          paddingHorizontal: scale(20),
          borderRadius: scale(20),
          alignItems: 'center',
          backgroundColor: appColors.lightGray,
          //width: '100%',
          flexDirection: 'row',
          height: scale(40),
        }}>
        <Image
          resizeMode="contain"
          style={{
            height: scale(25),
            width: scale(25),
          }}
          source={searchIcon}
        />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          autoFocus={autoFocus}
          onFocus={onFoucs && onFoucs}
          style={{
            flex: 1,
            paddingLeft: scale(10),
            color: 'black',
            fontSize: scale(15),
          }}
        />
      </View>
    </View>
  );
}
