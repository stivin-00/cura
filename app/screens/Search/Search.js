/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useEffect} from 'react';
import {appColors} from '../../utils/appColors';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Alert,
  StyleSheet,
  Modal,
  Text,
  FlatList,
  ScrollView,
  Pressable,
  RefreshControl,
  KeyboardAvoidingView,
} from 'react-native';
import BottomButtons from '../../components/BottomButtons';
import Feather from 'react-native-vector-icons/Feather';
import {scale} from 'react-native-size-matters';
import {searchList} from '../../redux/productAction';
import ProductCard from '../../components/ProductCard';
import Badge from '../../components/Badge';
import Container from '../../components/Container';
import SearchBox from '../../components/SearchBox';
import TitleComp from '../../components/TitleComp';
import {recentSearches} from '../../utils/MockData';
import ScreenHeader from '../../components/ScreenHeader';

export default function Search({navigation}) {
  const [colorFilter, setColorFilter] = useState(false);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [pageNumber, setPageNumber] = useState();
  const [category, setCategory] = useState('');

  const productSearchList = useSelector(state => state.productSearchList);
  const {searchLists, loading} = productSearchList;

  const [modalVisible, setModalVisible] = useState(false);

  const onChangeName = text => {
    setName(text);
  };
  // useEffect(() => {
  //   dispatch(searchList({}));
  //   // console.log('data223', products);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dispatch]);
  useEffect(() => {
    dispatch(
      searchList({
        // pageNumber,
        name: name !== 'all' ? name : '',
        category: category !== 'all' ? category : '',
        // min,
        // max,
        // rating,
        // order,
      }),
    );
  }, [category, dispatch, name]);

  const onRefresh = () => {
    setRefreshing(true);
    //Fetch the products from the server
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);

    console.log({refreshing});
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [refreshing, setRefreshing] = useState(false);
  console.log({navigation});
  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Container isScrollable>
          <SearchBox
            onChangeText={text => onChangeName(text)}
            rightIcon={'x'}
            autoFocus
            onRightIconPress={() => {
              navigation.navigate('Home');
            }}
          />
          <View style={{paddingVertical: scale(20)}}>
            <TitleComp subLabel="Popular Categories" />
            <ScrollView horizontal={true}>
              <FlatList
                style={{paddingVertical: scale(10)}}
                numColumns={3}
                ItemSeparatorComponent={() => (
                  <View style={{padding: scale(5)}} />
                )}
                data={recentSearches}
                renderItem={({item, index}) => (
                  <Pressable key={index} onPress={() => setCategory(item)}>
                    <Badge label={item} />
                  </Pressable>
                )}
              />
            </ScrollView>
          </View>
          {loading ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: scale(15), color: 'black'}}>
                loading...
              </Text>
            </View>
          ) : (
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
              <ScrollView horizontal={true}>
                <FlatList
                  style={{margin: 5, flex: 1}}
                  refreshControl={
                    <RefreshControl
                      colors={[appColors.primary, appColors.secondary]}
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  nestedScrollEnabled
                  showsVerticalScrollIndicator={true}
                  ItemSeparatorComponent={() => (
                    <View style={{padding: scale(5)}} />
                  )}
                  numColumns={2}
                  data={searchLists}
                  renderItem={({item, index}) => (
                    <View style={{paddingHorizontal: scale(5)}}>
                      <ProductCard
                        key={index}
                        navigation={navigation}
                        item={{...item, isNew: index < 1}}
                      />
                    </View>
                  )}
                />
              </ScrollView>
            </View>
          )}
        </Container>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Container isScrollable>
                <ScreenHeader
                  label="Filters"
                  navigation={navigation}
                  showSearch
                  rightIcon="x-octagon"
                />
                <View style={{paddingVertical: scale(20)}}>
                  <TitleComp
                    subLabel="No Settings"
                    heading="Popularity"
                    renderRight={() => (
                      <Feather name="chevron-down" size={scale(20)} />
                    )}
                  />
                </View>
                <View style={{paddingVertical: scale(20)}}>
                  <TitleComp
                    subLabel="Amusoftech, Apple, Mi"
                    heading="Brands"
                    renderRight={() => (
                      <Feather name="chevron-down" size={scale(20)} />
                    )}
                  />
                </View>

                <View style={{paddingVertical: scale(20)}}>
                  <TitleComp
                    subLabel="$20 - $ 1200"
                    heading="Price"
                    renderRight={() => (
                      <Feather name="chevron-down" size={scale(20)} />
                    )}
                  />
                </View>

                <View style={{paddingVertical: scale(20)}}>
                  <TitleComp
                    subLabel={!colorFilter ? 'Red' : null}
                    heading="Color"
                    renderRight={() => (
                      <Pressable onPress={() => setColorFilter(!colorFilter)}>
                        <Feather
                          name={colorFilter ? 'chevron-up' : 'chevron-down'}
                          size={scale(20)}
                        />
                      </Pressable>
                    )}
                  />
                  {colorFilter && (
                    <View style={{paddingVertical: scale(20)}}>
                      {/* <FlatList
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => item}
                        ItemSeparatorComponent={() => (
                          <View style={{padding: scale(10)}} />
                        )}
                        horizontal
                        renderItem={({item, index}) => (
                          <View
                            key={index}
                            style={{
                              backgroundColor: item,
                              height: scale(40),
                              width: scale(40),
                              borderRadius: scale(10),
                            }}
                          />
                        )}
                        data={Object.values(appColors)}
                      /> */}
                    </View>
                  )}
                </View>

                <View style={{paddingVertical: scale(20)}}>
                  <TitleComp
                    subLabel="4 Star"
                    heading="Rating"
                    renderRight={() => (
                      <Feather name="chevron-down" size={scale(20)} />
                    )}
                  />
                </View>

                <View style={{paddingVertical: scale(20)}}>
                  <TitleComp
                    subLabel="No Settings"
                    heading="Shipped From"
                    renderRight={() => (
                      <Feather name="chevron-down" size={scale(20)} />
                    )}
                  />
                </View>
              </Container>
              <BottomButtons
                buttonLabel={'Apply'}
                priceLabel="Filters"
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
          </View>
        </Modal>
        <BottomButtons
          onPress={() => setModalVisible(true)}
          priceLabel={'Apply filters >>'}
          buttonLabel="Filter"
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    marginBottom: 22,
  },
  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    width: '90%',
    height: '100%',
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
