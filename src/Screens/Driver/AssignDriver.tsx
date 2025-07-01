import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
import I18n from '../../i18n'; // adjust path as per your structure
import Driver from '../../../assets/Images/Svg/Driver.svg';
import Truck from '../../../assets/Images/Svg/Truck2.svg';
import {CairoBold, CairoSemiBold} from '../../utils/fonts';
import FileModal from '../Common/fileModal';
import {endpoint} from '../../API/Endpoint';
import {apiCall2} from '../../API/CustomHook';
import {getItem} from '../../utils/asyncStorage';
import FastImage from 'react-native-fast-image';

const AssignDriver = ({addItem, modalData, assign}) => {
  const [step, setStep] = useState(assign ? 2 : 1);
  const [data, setData] = useState([]);
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [modal, setModal] = useState(false);
  const [returnVal, setReturnVal] = useState();
  const [selectedVal, setSelectedVal] = useState('');
  const [confirmText, setConfirmText] = useState('edit');
  const [driverInfo, setDriverInfo] = useState({
    firstName: modalData?.fisrtName || '',
    lastName: modalData?.lastName || '',
    phone: modalData?.phoneNumber || '',
    idNumber: modalData?.idNumber || '',
    dob: modalData?.dob || '',
    licenseExpiry: modalData?.licenseExpiry || '',
    idcard: modalData?.idCard || '',
    dl: modalData?.driverLicense || '',
    truckId: modalData?.truckId || '',
  });

  useEffect(() => {
    if (selectedVal === 'Id Card') {
      setDriverInfo(prev => ({
        ...prev,
        idcard: returnVal,
      }));
    } else if (selectedVal === 'Driving License') {
      setDriverInfo(prev => ({
        ...prev,
        dl: returnVal,
      }));
    }
  }, [returnVal]);

  const handleNext = async () => {
    if (step === 1 && (!driverInfo.firstName || !driverInfo.lastName)) {
      Alert.alert(I18n.t('fill_first_last_name'));
      return;
    }
    if (!assign) {
      if (step === 2 && !selectedTruck) {
        Alert.alert(I18n.t('select_truck_alert'));
        return;
      }
      setStep(step + 1);
    }

    // GetFreeTruck;
    const auth = await getItem('auth');
    const res = await apiCall2({
      method: 'GET',
      endpoint: endpoint.GetFreeTruck,
      token: auth,
      params: {},
    });
    console.log(res.payload.payload);
    setData(res.payload.payload);
  };

  useEffect(() => {
    if (assign) handleNext();
  }, []);

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
      vehicleRegistration: '',
      operatingCard: '',
    });
  };

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

  const renderInput = (labelKey, value, onChange) => (
    <View style={styles.inputMainContainer}>
      <Text style={styles.label}>{I18n.t(labelKey)}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        style={styles.inputNew}
        placeholderTextColor="#aaa"
      />
    </View>
  );

  const submitHandler = async () => {
    const auth = await getItem('auth');
    const res = await apiCall2({
      method: 'POST',
      endpoint: endpoint.PostDriver,
      token: auth,
      params: {
        id: 0,
        name: driverInfo.firstName + driverInfo.lastName,
        idNumber: driverInfo.idNumber,
        phoneNumber: driverInfo.phone,
        dob: driverInfo.dob,
        fisrtName: driverInfo.firstName,
        lastName: driverInfo.lastName,
        licenseExpiry: driverInfo.licenseExpiry,
        idCard: driverInfo.idcard.base64,
        driverLicense: driverInfo.dl.base64,
        truckId: driverInfo?.truckId,
      },
    });
    console.log(res);
  };

  const editHandler = () => {
    if (confirmText === 'confirm') submitHandler();
    setConfirmText('confirm');
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        {step === 1 && (
          <View style={styles.card}>
            <Text style={styles.title}>
              👮 {addItem ? I18n.t('add_driver') : I18n.t('driverInformation')}
            </Text>
            <View style={styles.row}>
              {renderInput('first_name', driverInfo.firstName, text =>
                setDriverInfo({...driverInfo, firstName: text}),
              )}
              {renderInput('last_name', driverInfo.lastName, text =>
                setDriverInfo({...driverInfo, lastName: text}),
              )}
            </View>

            <View style={styles.row}>
              {renderInput('phone_number', driverInfo.phone, text =>
                setDriverInfo({...driverInfo, phone: text}),
              )}
              {renderInput('id_number', driverInfo.idNumber, text =>
                setDriverInfo({...driverInfo, idNumber: text}),
              )}
            </View>

            <View style={styles.row}>
              {renderInput('dob', driverInfo.dob, text =>
                setDriverInfo({...driverInfo, dob: text}),
              )}
              {renderInput('license_expiry', driverInfo.licenseExpiry, text =>
                setDriverInfo({...driverInfo, licenseExpiry: text}),
              )}
            </View>

            <View style={styles.row}>
              <FileField label="Id Card" file={driverInfo.idcard} />
              <FileField label="Driving License" file={driverInfo.dl} />
            </View>

            <TouchableOpacity
              style={[styles.addBtn, {height: '10%', alignSelf: 'center'}]}
              onPress={() => {
                addItem ? handleNext() : editHandler();
              }}>
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
            {data.map(truck => (
              <TouchableOpacity
                key={truck.id}
                style={[
                  styles.truckItem,
                  selectedTruck?.id === truck.id && styles.truckItemSelected,
                ]}
                onPress={() => {
                  setSelectedTruck(truck);
                  setDriverInfo(prev => ({...prev, truckId: truck?.id}));
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

                <View style={{width: '80%'}}>
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      paddingLeft: '5%',
                    }}>
                    <Text
                      style={[
                        styles.truckText,
                        {
                          maxWidth: '45%',
                        },
                      ]}>
                      {truck.platenumber} |
                    </Text>

                    <View style={{flexDirection: 'row'}}>
                      <View
                        style={[
                          styles.circle,
                          {
                            backgroundColor:
                              truck.colorName?.toLowerCase() || '#eee',
                          },
                        ]}
                      />
                      <Text style={[styles.truckText, {marginLeft: '20%'}]}>
                        {truck.brandName}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {step === 3 && (
          <View style={styles.card}>
            <Text style={styles.title}>✅ {I18n.t('assignment_done')}</Text>
            <Text style={styles.truckText}>
              {I18n.t('driver')}: {driverInfo.firstName} {driverInfo.lastName}
            </Text>
            <Text style={styles.truckText}>
              {I18n.t('phone')}: {driverInfo.phone}
            </Text>
            <Text style={styles.truckText}>
              {I18n.t('truck')}: {selectedTruck?.number} ({selectedTruck?.brand}
              )
            </Text>
            <Text style={styles.truckText}>
              {I18n.t('license_expiry')}: {driverInfo.licenseExpiry}
            </Text>
            <Text style={styles.truckText}>📁 {driverInfo.registration}</Text>
            <Text style={styles.truckText}>📁 {driverInfo.operatingCard}</Text>

            <TouchableOpacity
              style={[styles.prevBtn, {marginTop: 20}]}
              onPress={handleReset}>
              <Text style={styles.prevText}>{I18n.t('assign_another')}</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
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
  },
  label: {
    position: 'absolute',
    top: -8,
    left: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 4,
    fontSize: 15,
    color: '#A1A1A1',
    zIndex: 1,
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
    height: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {color: '#fff', textAlign: 'center', fontWeight: 'bold'},
  prevBtn: {
    backgroundColor: '#eee',
    borderRadius: 30,
    marginTop: 10,
    width: '45%',
    height: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  prevText: {textAlign: 'center', fontWeight: 'bold'},
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Dimensions.get('window').height / 1.9 + 10,
    position: 'absolute',
    height: '10%',
    backgroundColor: 'white',
    paddingTop: '5%',
    paddingLeft: '5%',
    width: '100%',
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
    // textDecorationLine: 'underline',
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
  circle: {
    width: 15,
    height: 15,
    borderRadius: 50,
    marginTop: '4%',
    left: '30%',
  },
});

export default AssignDriver;
