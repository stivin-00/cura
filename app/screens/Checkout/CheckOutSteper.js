// import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Container from '../../components/Container';
// import Stepper from 'react-native-stepper-ui';
import CheckoutDelivery from './CheckoutDelivery';
import {appColors} from '../../utils/appColors';
// import CustomButton from '../../components/CustomButton';
import {scale} from 'react-native-size-matters';
import ScreenHeader from '../../components/ScreenHeader';
import CheckoutAddress from './CheckoutAddress';
import CheckoutPayOption from './CheckoutPayOption';
import {useDispatch, useSelector} from 'react-redux';
// const {height} = Dimensions.get('window');

// export default function CheckOutSteper({navigation}) {
//   const [active, setActive] = useState(0);

//   return (
//     <Container>
//       <ScreenHeader label="Checkout" navigation={navigation} />

//       <Stepper
//         stepStyle={styles.stepStyle}
//         active={active}
//         onFinish={onFinish}
//         content={[
// <CheckoutDelivery />,
// <CheckoutAddress />,
// <CheckoutPayment />,
//         ]}
//         //showButton={false}
//         onNext={() => setActive(p => p + 1)}
//         onBack={() => setActive(p => p - 1)}
//         buttonStyle={styles.buttonStyle}
//         buttonTextStyle={styles.buttonTextStyle}
//         wrapperStyle={styles.wrapperStyle}
//       />
//     </Container>
//   );
// }

import React, {useState, useEffect} from 'react';
import {AlertHelper} from '../../utils/AlertHelper';
import Stepper from 'react-native-stepper-ui';
import {Alert} from 'react-native';
const MyComponent = props => {
  return (
    <View>
      <Text>{props.title}</Text>
    </View>
  );
};
const content = [
  <MyComponent title="Component 1" />,
  <MyComponent title="Component 2" />,
  <MyComponent title="Component 3" />,
];
const App = ({navigation}) => {
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo, loading, error} = userSignin;

  useEffect(() => {
    console.log(userInfo);
    if (!userInfo) {
      AlertHelper.show('error', 'pls signin');
      navigation.navigate('Login');
    }
  }, [navigation, userInfo]);
  const dispatch = useDispatch();
  const paymentType = useSelector(state => state.cart.payment);
  const [active, setActive] = useState(0);
  const [searchValue, setSearchValue] = useState(true);

  const onFinish = () => {
    if (paymentType === 'Pay on Delivery') {
      navigation.navigate('CheckoutPayment');
    } else {
      navigation.navigate('CheckoutPayment');
    }
  };
  return (
    <Container isScrollable>
      <ScreenHeader label="Checkout" navigation={navigation} />
      <View style={{marginVertical: 20, marginHorizontal: scale(0)}}>
        <Stepper
          stepStyle={styles.stepStyle}
          active={active}
          content={[
            <CheckoutDelivery />,
            <CheckoutAddress
              setSearchValue={setSearchValue}
              searchValue={searchValue}
            />,
            <CheckoutPayOption />,
          ]}
          onNext={() => setActive(p => p + 1)}
          onBack={() => setActive(p => p - 1)}
          onFinish={onFinish}
          showButton={searchValue}
          buttonStyle={styles.buttonStyle}
          buttonTextStyle={styles.buttonTextStyle}
        />
      </View>
    </Container>
  );
};

export default App;

const styles = StyleSheet.create({
  stepStyle: {
    backgroundColor: appColors.primary,
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
  },
  buttonTextStyle: {
    fontSize: scale(14),
    fontWeight: '500',
    color: appColors.white,
    letterSpacing: scale(2),
    textTransform: 'uppercase',
  },
  buttonStyle: {
    height: scale(40),
    backgroundColor: appColors.primary,
    borderRadius: scale(5),
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    marginVertical: scale(10),
    paddingHorizontal: scale(10),
    //position:'absolute',
    // bottom: scale(-30),
  },
  wrapperStyle: {},
});
