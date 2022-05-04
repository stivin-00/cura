import React from 'react';
import {View, Text} from 'react-native';
import {scale} from 'react-native-size-matters';
import CheckBox from './CheckBox';
import Label from './Label';
import TitleComp from './TitleComp';

export default function SelectAble({selected, onSelect, item}) {
  const {label, subLabel} = item;
  return (
    <View style={{flex: 1, paddingVertical: scale(20)}}>
      <TitleComp heading={label} />
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{paddingVertical: scale(10), width: '50%'}}>
          <Label text={subLabel} style={{fontSize: scale(13)}} />
        </View>
        <View
          style={{
            marginBottom: scale(20),
            marginLeft: scale(20),
            width: '50%',
          }}>
          <CheckBox
            onPress={() => onSelect && onSelect(item)}
            isChecked={selected}
          />
        </View>
      </View>
    </View>
  );
}
