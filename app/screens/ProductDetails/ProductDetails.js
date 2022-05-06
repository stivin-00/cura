import React from 'react';
import _ from 'lodash';
import SelectDropdown from 'react-native-select-dropdown';
import {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {AlertHelper} from '../../utils/AlertHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addToCart} from '../../redux/cartActions';
import {AirbnbRating} from 'react-native-ratings';
import {scale} from 'react-native-size-matters';
import Container from '../../components/Container';
import Label from '../../components/Label';
import {appColors} from '../../utils/appColors';
import Feather from 'react-native-vector-icons/Feather';
import TitleComp from '../../components/TitleComp';
import BottomButtons from '../../components/BottomButtons';
import ReduxWrapper from '../../utils/ReduxWrapper';
const img = require('../../utils/images/profile.png');

function ProductDetails({navigation, route: {params}}) {
  const {
    _id,
    name,
    description,
    price,
    countInStock,
    category,
    image,
    brand,
    rating,
    reviews,
  } = params.item;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    console.log('details====>', params.item);
  }, [params.item]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('xl');
  const [productId, setProductId] = useState(params.item._id);
  const itemQty = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const bodySize = ['sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'];

  const setLocal = () => {
    const itemcart = {
      ...params.item,
    };
    console.log('data1', itemcart);
    AsyncStorage.getItem('wishlist')
      .then(datacart => {
        if (datacart !== null) {
          // We have data!!
          const cart = JSON.parse(datacart);
          cart.push(itemcart);
          let unique = _.uniqWith(cart, _.isEqual);
          AsyncStorage.setItem('wishlist', JSON.stringify(unique));
          AlertHelper.show('success', 'Product added to Wishlist');
          console.log('data2', unique);
        } else {
          const cart = [];
          cart.push(itemcart);
          let unique = _.uniqWith(cart, _.isEqual);
          AsyncStorage.setItem('wishlist', JSON.stringify(unique));
          AlertHelper.show('success', 'Product added to Wishlist');
          console.log('data3', unique);
        }
      })
      .catch(err => {
        alert(err);
        AlertHelper.show('error', 'action failed, please try again');
        console.log('data4', err);
      });
  };

  const onAddToCartt = () => {
    try {
      dispatch(addToCart(productId, qty, size));
      AlertHelper.show('success', 'Product added to cart');
      console.log('product', productId);
      console.log('qty', qty);
      console.log('size', size);
    } catch (error) {
      AlertHelper.show('error', 'action failed, please try again');
      console.log('error', error);
    }
  };
  // render botton
  const _renderBottom = () => {
    return (
      <BottomButtons
        onPress={() => {
          onAddToCartt();
          // navigation.navigate('Cart');
        }}
        price={`₦${price}`}
        buttonLabel="ADD"
      />
    );
  };
  // review card
  const ReviewCard = ({item}) => {
    const {name, comment, rating} = item;
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image style={styles.imgC} source={img} />

        <View style={{flex: 1}}>
          <View style={styles.labelNStarC}>
            <Label
              text={name}
              style={{fontSize: scale(16), fontWeight: '600'}}
            />
            <AirbnbRating
              size={15}
              count={rating}
              defaultRating={rating}
              isDisabled
              showRating={false}
              selectedColor={appColors.yellow}
              //style={{paddingVertical: 10,  }}
            />
          </View>
          <Text style={{flexWrap: 'wrap', color: appColors.black}}>
            {comment}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <Container bodyStyle={{paddingHorizontal: scale(0)}} isScrollable>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
          <ImageBackground
            style={{height: scale(350), width: '100%'}}
            resizeMode="cover"
            source={{uri: image.url}}>
            <View
              style={{
                marginTop: scale(30),
                paddingHorizontal: scale(20),
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Pressable
                style={{
                  borderRadius: scale(25),
                  backgroundColor: appColors.white,
                  height: scale(45),
                  width: scale(45),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => navigation.goBack()}>
                <Feather
                  name="chevron-left"
                  size={scale(25)}
                  color={appColors.primary}
                />
              </Pressable>

              <Pressable
                onPress={setLocal}
                style={{
                  borderRadius: scale(25),
                  backgroundColor: appColors.white,
                  height: scale(45),
                  width: scale(45),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Feather
                  name="heart"
                  size={scale(20)}
                  color={appColors.primary}
                />
              </Pressable>
            </View>
          </ImageBackground>
        </View>
        <View style={{paddingHorizontal: scale(20), marginBottom: scale(100)}}>
          <View style={{paddingVertical: scale(20)}}>
            <Label
              text={name}
              style={{
                fontWeight: '500',
                fontSize: scale(20),
                textTransform: 'uppercase',
              }}
            />
          </View>

          <View
            style={{
              paddingVertical: scale(10),
              flexDirection: 'column',
              justifyContent: 'space-between',
              // alignItems: 'center',
            }}>
            <View style={styles.sizeContainer}>
              <Label text="Select Qty:" style={{fontSize: scale(15)}} />
              {/* <Label
                text={countInStock}
                style={{fontWeight: '700', fontSize: scale(15)}}> */}
              <SelectDropdown
                data={itemQty}
                onSelect={(selectedItem, index) => {
                  setQty(selectedItem);
                  console.log(selectedItem, index);
                }}
                buttonStyle={{
                  width: scale(80),
                  height: scale(22),
                  borderRadius: scale(5),
                  marginVertical: scale(-5),
                }}
                defaultButtonText={qty}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
              />
              {/* </Label> */}
            </View>
            <View style={styles.sizeContainer}>
              <Label text="Select Size:" style={{fontSize: scale(15)}} />
              <SelectDropdown
                buttonStyle={{
                  width: scale(80),
                  height: scale(22),
                  borderRadius: scale(5),
                  marginVertical: scale(-5),
                }}
                data={bodySize}
                onSelect={(selectedItem, index) => {
                  setSize(selectedItem);
                  console.log(selectedItem, index);
                }}
                defaultButtonText={size}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
              />
            </View>
            <View style={styles.sizeContainer}>
              <Label text="Brand :" style={{fontSize: scale(15)}} />
              <Label
                text={brand}
                style={{fontWeight: '700', fontSize: scale(15)}}
              />
            </View>
            <View style={styles.sizeContainer}>
              <Label text="Category :" style={{fontSize: scale(15)}} />
              <Label
                text={category}
                style={{fontWeight: '700', fontSize: scale(15)}}
              />
            </View>

            <View style={styles.sizeContainer}>
              <Label text="Rating :" style={{fontSize: scale(15)}} />

              <AirbnbRating
                size={15}
                count={5}
                defaultRating={rating}
                isDisabled
                showRating={false}
                selectedColor={appColors.yellow}
                //style={{paddingVertical: 10,  }}
              />
            </View>
          </View>

          <View style={{paddingVertical: scale(20)}}>
            <TitleComp heading={'Details'} />
            <View style={{paddingVertical: scale(20)}}>
              <Label
                text={description}
                style={{fontSize: scale(14), lineHeight: scale(25)}}
              />
            </View>
          </View>
          <View>
            <TitleComp heading={'Reviews'} />
            <Pressable
              onPress={() => navigation.navigate('WriteReview', {productId})}>
              <Label text="Write your review" style={styles.wrtitle} />
            </Pressable>
            <ScrollView horizontal={true} style={{width: '100%'}}>
              <FlatList
                data={reviews}
                ItemSeparatorComponent={() => (
                  <View style={{padding: scale(10)}} />
                )}
                renderItem={({item, index}) => (
                  <ReviewCard key={index} item={item} />
                )}
              />
            </ScrollView>
          </View>
        </View>
      </Container>
      {_renderBottom()}
    </>
  );
}

export default ReduxWrapper(ProductDetails);

const styles = StyleSheet.create({
  sizeContainer: {
    flex: 0.47,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scale(5),
    backgroundColor: appColors.white,
    padding: scale(10),
    paddingHorizontal: scale(20),
    borderRadius: scale(20),
    borderWidth: scale(0.4),
    borderColor: appColors.gray,
  },
  itemColor: {
    height: scale(20),
    width: scale(20),
    backgroundColor: appColors.primary,
    borderRadius: scale(5),
  },
  wrtitle: {
    paddingVertical: scale(10),
    fontSize: scale(14),
    color: appColors.primary,
  },
  imgC: {
    borderRadius: scale(35),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    height: scale(55),
    width: scale(55),
    marginRight: scale(20),
  },
  labelNStarC: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scale(10),
  },
});
