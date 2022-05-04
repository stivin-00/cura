/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import FastImage from 'react-native-fast-image';

// import {SliderBox} from './components/SliderBox'; // for develop time, first add:>>    yarn add react-native-snap-carousel
import {SliderBox} from 'react-native-image-slider-box';

const images = [
  'https://res.cloudinary.com/dxjprordi/image/upload/v1650977428/s8kjrgkjxw3bskykozxy.jpg',
  'https://res.cloudinary.com/dxjprordi/image/upload/v1648935229/jumstore/jumstorebanner5_msygk3.jpg',
  'https://res.cloudinary.com/dxjprordi/image/upload/v1650977478/gxlwlzftn237v4al2pqm.jpg',
  'https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?cs=srgb&dl=pexels-karolina-grabowska-5650026.jpg&fm=jpg',
  'https://images.pexels.com/photos/6869053/pexels-photo-6869053.jpeg?cs=srgb&dl=pexels-kindel-media-6869053.jpg&fm=jpg',
  'https://images.pexels.com/photos/5632398/pexels-photo-5632398.jpeg?cs=srgb&dl=pexels-karolina-grabowska-5632398.jpg&fm=jpg',
  'https://images.pexels.com/photos/5624985/pexels-photo-5624985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
];

export default function Slider() {
  return (
    <SafeAreaView style={styles.container}>
      <SliderBox
        ImageComponent={FastImage}
        images={images}
        sliderBoxHeight={160}
        onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
        //currentImageEmitter={index => console.warn(`image ${index} pressed`)}
        dotColor="#BD0F0F"
        inactiveDotColor="#90A4AE"
        paginationBoxVerticalPadding={20}
        paginationBoxStyle={{
          position: 'absolute',
          bottom: 0,
          padding: 0,
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          paddingVertical: 10,
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          padding: 0,
          margin: 0,
          backgroundColor: 'rgba(128, 128, 128, 0.92)',
        }}
        autoplay
        circleLoop
        ImageComponentStyle={{
          borderRadius: 15,
          width: '95%',
          marginTop: 5,
          alignSelf: 'center',
        }}
        imageLoadingColor="#BD0F0F"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
});
