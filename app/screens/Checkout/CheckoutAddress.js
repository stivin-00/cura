import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {AlertHelper} from '../../utils/AlertHelper';
import {scale} from 'react-native-size-matters';
import CustomButton from '../../components/CustomButton';
import {address} from '../../redux/cartActions';
import NaijaStates from 'naija-state-local-government';
import SelectDropdown from 'react-native-select-dropdown';
import {useDispatch} from 'react-redux';
import CheckBox from '../../components/CheckBox';
import Label from '../../components/Label';
import CustomInput from '../../components/CustomInput';
export default function CheckoutAddress({searchValue, setSearchValue}) {
  const dispatch = useDispatch();
  const [state, setState] = useState('Lagos');
  const [lga, setLga] = useState('');
  const [bustop, setBustop] = useState('');
  const [street, setStreet] = useState('');

  useEffect(() => {
    setSearchValue(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeBustop = text => {
    setBustop(text);
  };
  const onChangeStreet = text => {
    setStreet(text);
  };

  const saveData = () => {
    if (!state || !lga || !bustop || !street) {
      AlertHelper.show('error', 'please fill address completely');
    } else {
      let data = {
        State: state,
        LGA: lga,
        Bustop: bustop,
        Street: street,
      };
      dispatch(address(data));
      console.log('hello');
      setSearchValue(true);
    }
  };

  return (
    <View style={{paddingVertical: scale(30)}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingBottom: scale(15),
        }}>
        <CheckBox isChecked={true} />
        <View style={{paddingLeft: scale(10)}}>
          <Label
            text="Billing address is the same as delivery address"
            style={{fontSize: scale(15)}}
          />
        </View>
      </View>

      <View style={{paddingVertical: scale(10)}}>
        <Text style={{fontSize: scale(18), color: '#808080'}}>State</Text>
        <SelectDropdown
          data={NaijaStates.states()}
          onSelect={(selectedItem, index) => {
            setState(selectedItem);
            console.log(selectedItem, index);
            console.log('state', state);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
        />
        {/* </CustomInput> */}
      </View>
      <View style={{paddingVertical: scale(10)}}>
        <Text style={{fontSize: scale(18), color: '#808080'}}>Lga</Text>
        <SelectDropdown
          data={NaijaStates.lgas(state).lgas}
          onSelect={selectedItem => {
            setLga(selectedItem);
          }}
          buttonTextAfterSelection={selectedItem => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={item => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
        />
        {/* </CustomInput> */}
      </View>

      <View style={{paddingVertical: scale(10)}}>
        <CustomInput
          onChangeText={text => onChangeBustop(text)}
          containerStyle={{backgroundColor: 'transparent'}}
          value={bustop}
          label="Bustop"
        />
      </View>
      <View style={{paddingVertical: scale(10)}}>
        <CustomInput
          onChangeText={text => onChangeStreet(text)}
          containerStyle={{backgroundColor: 'transparent'}}
          value={street}
          label="Street"
        />
      </View>
      <CustomButton onPress={saveData} label="save" />
    </View>
  );
}
