import React from 'react';
import {View, Image} from 'react-native';
import {scale} from 'react-native-size-matters';
import {appColors} from '../utils/appColors';
import Label from './Label';
import {SimpleStepper} from 'react-native-simple-stepper';

export default function CheckOutItem({
  renderBagge,
  hideSteper,
  noBg,
  image,
  _id,
  name,
  qty,
  price,
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: noBg ? 'transparent' : appColors.lightGray,
        borderRadius: scale(10),
      }}>
      <Image
        style={{
          height: scale(100),
          width: scale(100),
          borderRadius: scale(noBg ? 5 : 5),
        }}
        source={{uri: image.url}}
      />

      <View
        style={{
          marginLeft: scale(10),
          justifyContent: 'space-between',
          paddingVertical: scale(10),
        }}>
        <Label text={name?.substring(0, 20)} style={{fontWeight: '600'}} />
        <Label
          text={`₦${price}`}
          style={{
            fontSize: scale(18),
            fontWeight: '500',
            color: '#000000',
          }}
        />
        {!hideSteper && (
          <SimpleStepper
            containerStyle={{
              backgroundColor: appColors.lightGray,
              flexDirection: 'row',
              borderRadius: scale(5),
              overflow: 'hidden',
              alignItems: 'center',
              paddingHorizontal: scale(20),
              height: scale(35),
            }}
            incrementStepStyle={{padding: scale(10), opacity: scale(0.4)}}
            decrementStepStyle={{padding: scale(10), opacity: scale(0.4)}}
            incrementImageStyle={{height: scale(0), width: scale(0)}}
            decrementImageStyle={{height: scale(0), width: scale(0)}}
            showText
            renderText={() => <Label text={qty} />}
            separatorStyle={{}}
          />
        )}

        {renderBagge && renderBagge()}
      </View>
    </View>
  );
}

const styles = {
  counterStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignself: 'center',
  },
};
