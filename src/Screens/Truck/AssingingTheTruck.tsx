import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Pressable,
  FlatList,
} from 'react-native';
import I18n from '../../i18n';
import Driver from '../../../assets/Images/Svg/Driver.svg';
import Truck from '../../../assets/Images/Svg/Truck2.svg';
import {CairoBold, CairoRegular, CairoSemiBold} from '../../utils/fonts';
import {Image} from 'react-native-animatable';
import {use} from 'i18next';
import FileModal from '../Common/fileModal';
import {apiCall, apiCall2} from '../../API/CustomHook';
import {endpoint} from '../../API/Endpoint';
import {getItem} from '../../utils/asyncStorage';
import FastImage from 'react-native-fast-image';
import CommonSelectDropdown from '../Common/Dropdown';
import {List} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';

const AssignTruck = ({addItem, modaldata, assign}) => {
  const [step, setStep] = useState(assign ? 2 : 1);
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [modal, setModal] = useState(false);
  const [returnVal, setReturnVal] = useState();
  const [selectedVal, setSelectedVal] = useState('');
  const [data, setData] = useState([]);
  const [listData, setListData] = useState([]);
  const [confirmText, setConfirmText] = useState('edit');
  const [driverInfo, setDriverInfo] = useState({
    truckType: modaldata?.truckTypeName || '',
    truckTypeId: modaldata?.truckTypeId || '',
    alpha: modaldata?.plateNumberAlpha || '',
    plateNumber: modaldata?.platenumber || '',
    sequenceNumber: modaldata?.sequenceNumber || '',
    brand: modaldata?.brandName || '',
    brandId: modaldata?.brandId || '',
    manufacturingYear: modaldata?.manyfacturingYear || '',
    axisNumber: modaldata?.axisNumber || '',
    color: modaldata?.colorName || '',
    colorId: modaldata?.colorId || '',
    weight: modaldata?.weight || '',
    width: modaldata?.width || '',
    vehicleRegistration: modaldata?.vehicleRegistration || {},
    card: modaldata?.operatingCard || {},
    driverId: modaldata?.driverId || '',
  });
  const [activeLabel, setActiveLabel] = useState('');

  useEffect(() => {
    if (selectedVal === 'Vehicle Registration') {
      setDriverInfo(prev => ({
        ...prev,
        vehicleRegistration: returnVal,
      }));
    } else if (selectedVal === 'Operating Card') {
      setDriverInfo(prev => ({
        ...prev,
        card: returnVal,
      }));
    } else if (selectedVal == 'truckType') {
      setDriverInfo(prev => ({
        ...prev,
        truckType: returnVal?.text,
        truckTypeId: returnVal?.id,
      }));
    } else if (selectedVal == 'color') {
      setDriverInfo(prev => ({
        ...prev,
        color: returnVal?.text,
        colorId: returnVal?.id,
      }));
    } else if (selectedVal == 'brand') {
      setDriverInfo(prev => ({
        ...prev,
        brand: returnVal?.text,
        brandId: returnVal?.id,
      }));
    } else if (selectedVal == 'manufacturingYear') {
      setDriverInfo(prev => ({
        ...prev,
        manufacturingYear: returnVal,
      }));
    } else if (selectedVal == 'axisNumber') {
      setDriverInfo(prev => ({
        ...prev,
        axisNumber: returnVal,
      }));
    }
  }, [returnVal]);

  const FileField = ({label, file}) => (
    <View style={styles.inputMainContainer}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        onPress={() => {
          setModal(prev => !prev);
          setSelectedVal(label);
        }}
        style={styles.fileTouchable}>
        {file?.name ? (
          <View style={styles.fileRow}>
            <Text
              style={styles.linkText}
              numberOfLines={1}
              ellipsizeMode="tail">
              {file?.name}
            </Text>
            <Text>.{file?.type}</Text>
            {file?.type == 'pdf' && (
              <Image
                source={{uri: 'https://img.icons8.com/color/48/pdf.png'}}
                style={styles.fileIcon}
              />
            )}
          </View>
        ) : (
          <Text style={styles.placeholderText}></Text>
        )}
      </TouchableOpacity>
    </View>
  );

  const handleNext = async () => {
    if (step === 1 && (!driverInfo.truckType || !driverInfo.plateNumber)) {
      Alert.alert(I18n.t('fill_first_last_name'));
      return;
    }

    if (!assign) {
      if (step === 2 && !selectedTruck) {
        Alert.alert(I18n.t('select_truck_alert'));
        return;
      }
    }

    if (!assign) setStep(step + 1);
    const auth = await getItem('auth');
    const res = await apiCall2({
      method: 'GET',
      endpoint: endpoint.GetFreeDrivers,
      token: auth,
      params: {},
    });
    console.log(JSON.stringify(res.payload.payload, null, 3));
    setData(res.payload.payload);
  };

  useEffect(() => {
    if (assign) {
      handleNext();
    }
  }, []);

  const getLast30Years = () => {
    const currentYear = new Date().getFullYear();
    const years = [];

    for (let i = 0; i < 30; i++) {
      years.push(currentYear - i);
    }

    return years;
  };
  const yearList = getLast30Years();
  const handleBack = () => setStep(step - 1);
  const handleReset = () => {
    setStep(1);
    setSelectedTruck(null);
    setDriverInfo({
      firstName: '',
      lastName: '',
      phone: '',
      idNumber: '',
      dob: '',
      licenseExpiry: '',
      registration: '',
      operatingCard: '',
    });
  };

  const renderInput = (labelKey, value, onChange, placeholder = '') => (
    <View style={styles.inputMainContainer}>
      <Text style={styles.label}>{I18n.t(labelKey)}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        style={styles.inputNew}
        placeholderTextColor="#aaa"
        placeholder={placeholder}
      />
    </View>
  );

  const submitHandler = async () => {
    const auth = await getItem('auth');
    const res = await apiCall2({
      method: 'POST',
      endpoint: endpoint.PostTruck,
      token: auth,
      params: {
        id: 0,
        truckTypeId: driverInfo.truckTypeId,
        truckTypeName: driverInfo.truckType,
        truckTypeImage: '',
        plateNumberAlpha: String(driverInfo.alpha),
        platenumber: driverInfo.plateNumber,
        sequenceNumber: driverInfo.sequenceNumber,
        brandId: driverInfo.brandId,
        brandName: driverInfo.brand,
        manyfacturingYear: String(driverInfo.manufacturingYear),
        axisNumber: driverInfo.axisNumber,
        colorId: driverInfo.colorId,
        colorName: driverInfo.color,
        weight: driverInfo.weight?.toString().trim(),
        width: driverInfo.width,
        vehicleRegistration: driverInfo.vehicleRegistration.base64,
        operatingCard: driverInfo.card?.base64,
        driverId: parseInt(driverInfo.driverId),
      },
    });
    console.log(res);
    Alert.alert(res.payload.payload);
  };

  const stateHandler = async text => {
    console.log(endpoint);
    try {
      const auth = await getItem('auth');
      const response = await apiCall2({
        method: 'GET',
        endpoint: text,
        token: auth,
      });

      console.log('✅ API response:', JSON.stringify(response.payload.payload));
      setListData(response.payload.payload);
    } catch (error) {
      console.error('❌ Error in API call:', error);
    }
  };

  const selectLabel = label => {
    setActiveLabel(label);
  };

  const HandleConfirm = () => {
    if (confirmText === 'confirm') {
      submitHandler();
    }
    setConfirmText('confirm');
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
        keyboardVerticalOffset={100}>
        <View
          style={styles.container}
          // keyboardShouldPersistTaps="handled"
          // showsVerticalScrollIndicator={false}
        >
          {step === 1 && (
            <View style={styles.card}>
              <Text style={styles.title}>
                ⛟ {'   '}{' '}
                {addItem ? I18n.t('add_truck') : I18n.t('truck_information')}
              </Text>
              <View style={[styles.row, {zIndex: 20, position: 'relative'}]}>
                <CommonSelectDropdown
                  activeLabel={activeLabel}
                  setActiveLabel={setActiveLabel}
                  label="truck_type"
                  value={driverInfo.truckType}
                  list={listData}
                  onSelect={item => {
                    stateHandler(endpoint.truck);
                    setSelectedVal('truckType');
                    setReturnVal(item);
                    selectLabel('truckType');
                  }}
                  containerStyle={{width: '48%'}}
                />
                <View style={[styles.row, {width: '50%', height: '115%'}]}>
                  <View style={{width: '65%'}}>
                    {renderInput(
                      'plate_number',
                      driverInfo.plateNumber,
                      text => setDriverInfo({...driverInfo, plateNumber: text}),
                      '1234',
                    )}
                  </View>
                  <TextInput
                    value={driverInfo.alpha}
                    onChangeText={() => {
                      setDriverInfo(text => ({...driverInfo, alpha: text}));
                    }}
                    autoCapitalize="characters"
                    style={styles.seprateInput}
                    placeholder="ABC"
                  />
                </View>
              </View>

              <View style={[styles.row, {zIndex: 19, position: 'relative'}]}>
                {renderInput(
                  'sequence_number',
                  driverInfo.sequenceNumber,
                  text => setDriverInfo({...driverInfo, sequenceNumber: text}),
                )}
                <CommonSelectDropdown
                  activeLabel={activeLabel}
                  setActiveLabel={setActiveLabel}
                  label="brand"
                  value={driverInfo.brand}
                  list={listData}
                  onSelect={item => {
                    stateHandler(endpoint.getBrand);
                    setSelectedVal('brand');
                    setReturnVal(item);
                    selectLabel('brand');
                  }}
                  containerStyle={{width: '48%'}}
                />
              </View>

              <View style={[styles.row, {zIndex: 18, position: 'relative'}]}>
                <CommonSelectDropdown
                  activeLabel={activeLabel}
                  setActiveLabel={setActiveLabel}
                  label="manufacturing_year"
                  value={driverInfo.manufacturingYear}
                  list={yearList}
                  onSelect={item => {
                    setSelectedVal('manufacturingYear');
                    setReturnVal(item);
                    selectLabel('manufacturing_year');
                  }}
                  containerStyle={{width: '48%'}}
                />

                <CommonSelectDropdown
                  activeLabel={activeLabel}
                  setActiveLabel={setActiveLabel}
                  label="axis_number"
                  value={driverInfo.axisNumber}
                  list={[1, 2]}
                  onSelect={item => {
                    setSelectedVal('axisNumber');
                    setReturnVal(item);
                    selectLabel('axis_number');
                  }}
                  containerStyle={{width: '48%'}}
                />
              </View>

              <View style={[styles.row, {zIndex: 17, position: 'relative'}]}>
                <View style={{width: '48%', paddingTop: '1.5%'}}>
                  <CommonSelectDropdown
                    activeLabel={activeLabel}
                    setActiveLabel={setActiveLabel}
                    label="color"
                    value={driverInfo.color}
                    list={listData}
                    onSelect={item => {
                      stateHandler(endpoint.getTruckColor);
                      setSelectedVal('color');
                      setReturnVal(item);
                      selectLabel('color');
                    }}
                    containerStyle={{width: '100%'}}
                  />
                </View>
                <View style={[styles.row, {width: '50%'}]}>
                  {renderInput(
                    'weight',
                    driverInfo.weight,
                    text => setDriverInfo({...driverInfo, weight: text}),
                    'Tons',
                  )}
                  {renderInput(
                    'width',
                    driverInfo.width,
                    text => setDriverInfo({...driverInfo, width: text}),
                    'Meter',
                  )}
                </View>
              </View>

              <View style={styles.row}>
                <FileField
                  label="Vehicle Registration"
                  file={driverInfo.vehicleRegistration}
                />
                <FileField label="Operating Card" file={driverInfo.card} />
              </View>

              <TouchableOpacity
                style={[styles.addBtn, {height: '10%', alignSelf: 'center'}]}
                onPress={addItem ? handleNext : HandleConfirm}>
                <Text style={styles.addText}>
                  {addItem
                    ? I18n.t('next_assign_truck')
                    : I18n.t(`${confirmText}`)}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {step === 2 && (
            <View style={styles.card}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Truck />
                <Text style={styles.title}>{I18n.t('select_truck')}</Text>
              </View>

              <FlatList
                data={data}
                keyExtractor={item => item?.id?.toString()}
                renderItem={({item: truck}) => (
                  <TouchableOpacity
                    style={[
                      styles.truckItem,
                      selectedTruck?.id === truck?.id &&
                        styles.truckItemSelected,
                    ]}
                    onPress={() => {
                      setSelectedTruck(truck);
                      setDriverInfo(prev => ({...prev, driverId: truck?.id}));
                    }}>
                    <View
                      style={{
                        width: '18%',
                        borderWidth: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                        marginRight: '2%',
                      }}>
                      <Driver />
                    </View>

                    <View
                      style={{
                        width: '80%',
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingHorizontal: '5%',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.textBox}>{truck?.name}</Text>
                      <Text>|</Text>
                      <Text style={styles.textBox}>{truck?.idNumber}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>
        {step == 2 && (
          <View style={styles.buttonRow}>
            {!assign && (
              <TouchableOpacity style={styles.prevBtn} onPress={handleBack}>
                <Text style={styles.prevText}>{I18n.t('back')}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[
                styles.addBtn,
                {
                  width: assign ? '100%' : '45%',
                },
              ]}
              onPress={submitHandler}>
              <Text style={styles.addText}>{I18n.t('submit')}</Text>
            </TouchableOpacity>
          </View>
        )}
        <FileModal
          photoModal={modal}
          setPhotoModal={setModal}
          setReturnVal={setReturnVal}
        />
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {paddingVertical: 20},
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 20,
    elevation: 5,
    marginBottom: 20,
  },
  title: {fontSize: 22, fontFamily: CairoBold, marginLeft: '5%'},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 10,
  },
  inputMainContainer: {
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    position: 'relative',
    borderWidth: 0.5,
    borderColor: 'gray',
    flex: 1,
    zIndex: 1,
  },
  label: {
    position: 'absolute',
    top: -8,
    left: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 4,
    fontSize: 12,
    color: '#A1A1A1',
    // zIndex: 1,
  },
  inputNew: {
    fontSize: 16,
    color: '#000',
    minHeight: 50,
    paddingTop: 10,
  },
  truckItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
  },
  truckItemSelected: {
    borderColor: 'red',
    backgroundColor: '#fce4ec',
  },
  truckText: {fontSize: 16, marginBottom: 5},
  addBtn: {
    backgroundColor: 'red',
    borderRadius: 30,
    marginTop: 10,
    width: '45%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {color: '#fff', textAlign: 'center', fontWeight: 'bold'},
  prevBtn: {
    backgroundColor: '#eee',
    borderRadius: 30,
    marginTop: 10,
    width: '45%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  prevText: {textAlign: 'center', fontWeight: 'bold'},
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Dimensions.get('window').height / 1.9,
    position: 'absolute',
    height: '15%',
    backgroundColor: 'white',
    paddingTop: '5%',
  },
  field: {
    flex: 1,
    minWidth: '45%',
    marginRight: 12,
    marginBottom: 8,
  },

  value: {
    fontSize: 16,
    fontFamily: CairoRegular,
  },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  fileIcon: {
    width: 20,
    height: 20,
    marginRight: 6,
  },
  linkText: {
    color: '#000',
    textDecorationLine: 'underline',
  },
  fileTouchable: {
    minHeight: 50,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  placeholderText: {
    fontSize: 16,
    color: '#aaa',
  },
  seprateInput: {
    borderWidth: 0.5,
    borderColor: 'gray',
    width: '30%',
    borderRadius: 10,
    height: '75%',
    marginTop: '5%',
    right: '5%',
    paddingLeft: '5%',
  },
  down: {
    fontSize: 40,
    color: 'gray',
    fontWeight: '600',
    position: 'absolute',
    left: '90%',
    top: '2%',
  },
  textBox: {
    width: '45%',
    textAlign: 'center',
    fontFamily: CairoSemiBold,
    fontSize: 15,
  },
});

export default AssignTruck;
