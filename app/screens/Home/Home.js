import React, {useRef, useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, Image, Pressable} from 'react-native';
import {} from 'react-native-gesture-handler';
import {categoriesList, bestSellersList} from '../../utils/MockData';
import {useDispatch, useSelector} from 'react-redux';
import {appColors, shadow} from '../../utils/appColors';
import Slider from '../../components/Slider';
import TouchableRipple from 'react-native-touch-ripple';
import Label from '../../components/Label';
import {listProducts} from '../../redux/productAction';
import Container from '../../components/Container';
import Product from '../../components/ProductCard';
import {addToCart} from '../../redux/cartActions';
import {scale} from 'react-native-size-matters';
import SearchBox from '../../components/SearchBox';
import TitleComp from '../../components/TitleComp';
import {connect} from 'react-redux';
import auth from '@react-native-firebase/auth';
// import ReduxWrapper from '../../utils/ReduxWrapper';
import TestComp from '../../components/TestComp';
// import NativeAdView from 'react-native-admob-native-ads';
import {ANDROID_FULL_PAGE_AD_ID} from '../../utils/appConfig';
import useListners from '../../hooks/useListners';
import Banner from '../../components/Banner';

function Home({navigation}) {
  const nativeAdViewRef = useRef();

  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const {loading, error, products} = productList;

  useEffect(() => {
    dispatch(listProducts({}));
  }, [dispatch]);
  const clicked = () => {
    navigation.navigate('Search');
  };
  const RenderTitle = ({heading, rightLabel}) => {
    return <TitleComp heading={heading} rightLabel={rightLabel} />;
  };
  const ProductCard = ({item}) => {
    return <Product navigation={navigation} item={item} />;
  };
  return (
    <Container isScrollable style={styles.container}>
      <SearchBox onFoucs={() => navigation.navigate('Search')} />
      <Slider />
      <View
        style={{
          paddingVertical: scale(13),
          marginHorizontal: scale(-15),
          borderRadius: scale(10),
          backgroundColor: '#f9f7fa',
          marginBottom: scale(10),
        }}>
        <View
          style={{
            backgroundColor: '#FBD0D0',
            padding: scale(2),
            marginTop: scale(-14),
            borderTopLeftRadius: scale(10),
            borderTopRightRadius: scale(10),
          }}>
          <RenderTitle heading="Categories" />
        </View>
        <FlatList
          style={{
            marginTop: scale(8),
            width: '100%',
          }}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={categoriesList}
          ItemSeparatorComponent={() => <View style={{padding: scale(10)}} />}
          renderItem={({item, index}) => {
            const {label, image} = item;
            return (
              <View key={index} style={{alignItems: 'center'}}>
                <TouchableRipple
                  onPress={() => {
                    // getProducts$(label);
                    navigation.navigate('Category', {item});
                  }}
                  rippleColor={appColors.primary}
                  rippleContainerBorderRadius={scale(40)}
                  rippleDuration={800}
                  style={{
                    ...shadow,
                    marginHorizontal: scale(-5),
                    backgroundColor: appColors.white,
                    height: scale(60),
                    width: scale(60),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: scale(40),
                  }}>
                  <Image
                    resizeMode="contain"
                    style={{height: scale(50), width: scale(38)}}
                    source={image}
                  />
                </TouchableRipple>
                <View style={{marginTop: scale(5)}}>
                  <Label text={label} style={{fontSize: scale(14)}} />
                </View>
              </View>
            );
          }}
        />
      </View>
      <View
        style={{
          marginHorizontal: scale(-18),
          paddingHorizontal: scale(1),
          paddingBottom: scale(8),
          marginTop: scale(10),
          borderRadius: scale(10),
          backgroundColor: '#f9f7fa',
          marginBottom: scale(10),
        }}>
        <View
          style={{
            paddingVertical: scale(5),
            backgroundColor: '#FBD0D0',
            padding: scale(2),

            marginTop: scale(-14),
            borderTopLeftRadius: scale(10),
            borderTopRightRadius: scale(10),
          }}>
          <RenderTitle heading="Best Selling" rightLabel="See All >" />
        </View>
        <View style={{paddingHorizontal: scale(1)}}>
          {loading ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: scale(15), color: 'black'}}>
                loading...
              </Text>
            </View>
          ) : (
            <FlatList
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => (
                <View style={{padding: scale(5)}} />
              )}
              horizontal
              data={products}
              renderItem={({item, index}) => (
                <ProductCard key={index} item={item} />
              )}
            />
          )}
        </View>
      </View>
      <Banner click={clicked} />
      <View
        style={{
          marginHorizontal: scale(-18),
          paddingHorizontal: scale(1),
          paddingBottom: scale(8),
          marginTop: scale(10),
          borderRadius: scale(10),
          backgroundColor: '#f9f7fa',
          marginBottom: scale(10),
        }}>
        <View
          style={{
            paddingVertical: scale(5),
            backgroundColor: '#FBD0D0',
            padding: scale(2),
            marginTop: scale(-14),
            borderTopLeftRadius: scale(10),
            borderTopRightRadius: scale(10),
          }}>
          <RenderTitle heading="Latest" rightLabel="See All >" />
        </View>
        {loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: scale(15), color: 'black'}}>
              loading...
            </Text>
          </View>
        ) : (
          <FlatList
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{padding: scale(5)}} />}
            horizontal
            data={products}
            inverted={true}
            renderItem={({item, index}) => (
              <ProductCard key={index} item={item} />
            )}
          />
        )}
      </View>
    </Container>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: appColors.primary,
    alignItems: 'center',
    borderBottomWidth: 12,
    borderBottomColor: '#ddd',
  },
  headerText: {
    color: 'white',
    fontSize: 25,
    padding: 20,
    margin: 20,
    textAlign: 'center',
  },
  TitleText: {
    fontSize: 25,
    // padding: 20,
    marginVertical: 20,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 0,
  },
});
