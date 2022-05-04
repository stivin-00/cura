import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {View, Text, FlatList, ScrollView} from 'react-native';
import {scale} from 'react-native-size-matters';
import {deliveryType} from '../../redux/cartActions';
import SelectAble from '../../components/SelectAble';
import {deliveryTypes} from '../../utils/MockData';

export default function CheckoutDelivery({navigation}) {
  const dispatch = useDispatch();
  const [selectedAddress, setSelectedAddress] = useState('Standard Delivery');
  const onSelect = item => {
    setSelectedAddress(item.label);
    dispatch(deliveryType(item.label));
  };
  return (
    <View style={{paddingVertical: scale(20)}}>
      <ScrollView horizontal={true} style={{width: '100%'}}>
        <FlatList
          data={deliveryTypes}
          renderItem={({item, index}) => (
            <SelectAble
              selected={selectedAddress === item.label}
              onSelect={onSelect}
              item={item}
              key={index}
            />
          )}
        />
      </ScrollView>
    </View>
  );
}
