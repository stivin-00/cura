/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useEffect} from 'react';
import {View, Text, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {createReview} from '../../redux/productAction';
import Container from '../../components/Container';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {scale} from 'react-native-size-matters';
import Label from '../../components/Label';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {appColors} from '../../utils/appColors';
import StarRating from 'react-native-star-rating';
import Feather from 'react-native-vector-icons/Feather';

export default function WriteReview({navigation, route: {params}}) {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const productId = params.productId;
  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState('');
  const productDetails = useSelector(state => state.productDetails);
  const {loading, error, product} = productDetails;
  const userInfo = useSelector(state => state.userSignin.userInfo);

  const onChangeStreet = text => {
    setComment(text);
  };

  useEffect(() => {
    setUser(userInfo);
    console.log('haasd=>', user);
  }, [user, userInfo]);
  useEffect(() => {
    console.log(productId);
    // console.log(userInfo);
  }, [productId, userInfo]);

  const submitHandler = e => {
    // e.preventDefault();r
    if (comment && rating) {
      dispatch(createReview(productId, {rating, comment, name: userInfo.name}));
      navigation.goBack();
    } else {
      alert('Please enter comment and rating');
    }
  };
  return (
    <Container>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          paddingVertical: scale(40),
        }}>
        <Pressable onPress={() => navigation.goBack()} style={{left: -105}}>
          <Feather
            name={'chevron-down'}
            size={scale(25)}
            color={appColors.black}
          />
        </Pressable>
        <Label
          text={productId}
          style={{fontWeight: '500', fontSize: scale(18)}}
        />
      </View>

      <View style={{paddingVertical: scale(20)}}>
        {/* <Label text={title} style={{fontWeight: '800', fontSize: scale(28)}} /> */}
      </View>

      <View style={{paddingVertical: scale(20), width: '80%'}}>
        <StarRating
          disabled={false}
          maxStars={5}
          rating={rating}
          selectedStar={rating => setRating(rating)}
          fullStarColor={appColors.yellow}
          emptyStarColor={appColors.lightGray}
        />
      </View>

      <View style={{paddingVertical: scale(20)}}>
        <CustomInput
          onChangeText={text => onChangeStreet(text)}
          containerStyle={{backgroundColor: 'transparent'}}
          placeholder="Tell us your experience"
          InputStyle={{fontSize: scale(18)}}
        />
      </View>

      <View style={{paddingVertical: scale(20), alignItems: 'flex-end'}}>
        <View style={{flex: 0.5, width: '50%'}}>
          <CustomButton onPress={() => submitHandler()} label="SEND" />
        </View>
      </View>
    </Container>
  );
}
