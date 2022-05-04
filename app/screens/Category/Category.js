import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Pressable, RefreshControl} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import Container from '../../components/Container';
import Label from '../../components/Label';
import ProductCardHorizontal from '../../components/ProductCardHorizontal';
import TitleComp from '../../components/TitleComp';
import Feather from 'react-native-vector-icons/Feather';
import {appColors} from '../../utils/appColors';
import {listProductCategories} from '../../redux/productAction';
import BottomButtons from '../../components/BottomButtons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ReduxWrapper from '../../utils/ReduxWrapper';

function Category({navigation, route: {params}}) {
  const [refreshing, setRefreshing] = useState(false);
  const category = params.item.label;
  const productCategoryList = useSelector(state => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    catProducts,
  } = productCategoryList;
  const dispatch = useDispatch();
  // const lengt = products.length;
  // FNCTNS
  const onRefresh = () => {
    setRefreshing(true);
    //Fetch the products from the server
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);

    console.log({refreshing});
  };

  useEffect(() => {
    dispatch(
      listProductCategories({
        category: category !== 'all' ? category : '',
      }),
    );
  }, [category, dispatch]);

  const _renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: scale(20),
        }}>
        <Pressable onPress={() => navigation.navigate('Home')}>
          <View
            style={{
              height: scale(45),
              width: scale(45),
              backgroundColor: appColors.primary,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: scale(25),
            }}>
            <Feather
              name="chevron-left"
              size={scale(25)}
              color={appColors.white}
            />
          </View>
        </Pressable>

        <Label
          text={params.item.label}
          style={{fontWeight: '500', fontSize: scale(22)}}
        />

        <View
          style={{
            height: scale(45),
            width: scale(45),
            backgroundColor: appColors.primary,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: scale(25),
          }}>
          <Feather name="search" size={scale(20)} color={appColors.white} />
        </View>
      </View>
    );
  };

  return (
    <>
      <Container>
        {_renderHeader()}
        <View style={{paddingVertical: scale(20)}}>
          <TitleComp heading={` Results`} />
        </View>
        <View
          style={{
            flex: 1,
            marginBottom: scale(50),
            alignItems: 'center',
            marginHorizontal: scale(-13),
            paddingHorizontal: scale(8),
            marginTop: scale(3),
            borderRadius: scale(10),
            backgroundColor: '#f9f7fa',
          }}>
          <FlatList
            refreshControl={
              <RefreshControl
                colors={[appColors.primary, appColors.secondary]}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{padding: scale(10)}} />}
            numColumns={2}
            data={catProducts}
            renderItem={({item, index}) => (
              <ProductCardHorizontal
                key={index}
                navigation={navigation}
                item={{...item, isNew: index < 1}}
              />
            )}
          />
        </View>
      </Container>
      {/* <BottomButtons
        onPress={() => navigation.navigate('Filters')}
        priceLabel={'No Filter Applied'}
        buttonLabel="Filter"
      /> */}
    </>
  );
}
export default ReduxWrapper(Category);
