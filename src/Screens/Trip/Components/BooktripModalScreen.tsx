import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import Truck from '../../../../assets/Images/Svg/Truck.svg';
import {Cairo, CairoRegular, CairoSemiBold} from '../../../utils/fonts';
import {getItem} from '../../../utils/asyncStorage';
import {apiCall2} from '../../../API/CustomHook';
import {endpoint} from '../../../API/Endpoint';

const BookTripModal = ({data, setBookTripModalVisible}) => {
  const [step, setStep] = useState(1);
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [truckData, setTruckData] = useState([]);

  useEffect(() => {
    const fucnCall = async () => {
      try {
        const auth = await getItem('auth');
        console.log('📦 Token from AsyncStorage:', auth);

        const response = await apiCall2({
          method: 'GET',
          endpoint: endpoint.GetDriverTruckToBookTrip,
          token: auth,
        });

        console.log(
          '✅ API response:',
          JSON.stringify(response.payload.payload, null, 2),
        );
        setTruckData(response.payload.payload);
      } catch (error) {
        console.error('❌ Error in API call:', error);
      }
    };

    fucnCall();
  }, []);

  const submitHandler = async () => {
    const auth = await getItem('auth');
    const res = await apiCall2({
      method: 'POST',
      endpoint: endpoint.PostBookTrip,
      token: auth,
      params: {
        tripId: data?.tripId,
        truckId: selectedTruck?.truckId,
        driverId: selectedTruck?.driverId,
        carrierId: 0,
      },
    });
    console.log(res);
    const response = res.payload.payload;
    if (res.payload.status) {
      setBookTripModalVisible(false);
      Alert.alert(response);
    } else {
      Alert.alert('Something Went Wrong');
    }
  };

  const renderTruckItem = item => (
    <TouchableOpacity
      style={[
        styles.truckCard,
        selectedTruck?.truckId === item.truckId && styles.truckCardSelected,
      ]}
      onPress={() => setSelectedTruck(item)}>
      <View style={styles.truckRow}>
        <View style={styles.truckContainer}>
          <Truck width={36} height={36} />
          <Text style={styles.truckType}>{item?.truckType}</Text>
        </View>

        <View style={[styles.truckDetails]}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: Dimensions.get('window').width / 2,
            }}>
            <Text style={styles.truckPlate}>{item?.plateNumber}</Text>
            <Text>|</Text>
            <View
              style={[
                styles.circle,
                {
                  backgroundColor: item?.color?.toLowerCase() || '#eee',
                },
              ]}
            />
            <Text>{item?.brand}</Text>
          </View>
          <Text style={styles.truckDriver}>{item?.driver}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.overlay, {marginTop: step == 1 ? '22%' : '90%'}]}>
      <View style={styles.modalView}>
        <Text style={styles.tripId}>{data?.tripNumber}</Text>
        <View style={styles.line} />
        <Text style={styles.tripDetails}>Trip Details</Text>

        <View style={styles.dateContainer}>
          <Text>{data?.date}</Text>
        </View>

        <View style={{paddingHorizontal: '3%'}}>
          <View style={styles.rowBetween}>
            <View style={styles.rowBetweenSubContainer}>
              <Text style={styles.label}>Loading</Text>
              <Text style={styles.label2}>{data?.pickUpCity}</Text>
            </View>

            <View style={styles.rowBetweenSubContainer}>
              <Text style={styles.label}>Unloading</Text>
              <Text style={styles.label2}>{data?.dropOffCity}</Text>
            </View>
          </View>
          <View style={[styles.rowBetween, {marginTop: '5%'}]}>
            <View style={styles.rowBetweenSubContainer}>
              <Text style={styles.label}>Product</Text>
              <Text style={styles.label2}>{data?.product}</Text>
            </View>
            <View style={styles.rowBetweenSubContainer}>
              <Text style={styles.label}>Weight</Text>
              <Text style={styles.label2}>{data?.weight}</Text>
            </View>
          </View>
        </View>

        {step === 1 ? (
          <>
            <View style={styles.line} />
            <Text style={styles.tripDetails}>Assign Truck</Text>
            <FlatList
              data={truckData}
              keyExtractor={item => item?.truckId?.toString()}
              renderItem={({item}) => renderTruckItem(item)}
              style={{marginTop: 8}}
            />

            <View
              style={{
                backgroundColor: '#F4F4F4',
                borderRadius: 10,
                justifyContent: 'space-around',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text>{data?.amount} SR</Text>
              <TouchableOpacity
                disabled={!selectedTruck}
                onPress={() => {
                  setStep(2);
                  console.log('hi');
                }}
                style={[styles.primaryBtn]}>
                <Text style={styles.btnText}>Next</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <View style={[styles.line, {marginBottom: 5, marginTop: 5}]} />
            <View style={styles.confirmCard}>
              <Truck width={44} height={44} />
              <View style={{marginLeft: '10%'}}>
                <View style={[styles.truckDetails]}>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      width: Dimensions.get('window').width / 2,
                    }}>
                    <Text style={styles.truckPlate}>
                      {selectedTruck?.plateNumber}
                    </Text>
                    <Text>|</Text>
                    <View
                      style={[
                        styles.circle,
                        {
                          backgroundColor:
                            selectedTruck?.color?.toLowerCase() || '#eee',
                        },
                      ]}
                    />
                    <Text>{selectedTruck?.brand}</Text>
                  </View>
                  <Text style={styles.truckDriver}>
                    {selectedTruck?.driver}
                  </Text>
                  <Text style={styles.truckDriver}>
                    {selectedTruck?.phoneNumber}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                backgroundColor: '#F4F4F4',
                borderRadius: 10,
                justifyContent: 'space-around',
                flexDirection: 'row',
                alignItems: 'center',
                width: '120%',
                right: '10%',
                marginTop: '5%',
                // position: 'absolute',
                zIndex: 10,
              }}>
              <Text style={{left: '30%'}}>{data.amount} SR</Text>
              <TouchableOpacity
                disabled={!selectedTruck}
                onPress={() => setStep(1)}
                style={[styles.primaryBtn, {width: '25%', left: '25%'}]}>
                <Text style={styles.btnText}>Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={!selectedTruck}
                onPress={() => {
                  submitHandler();
                  setStep(2);
                }}
                style={[styles.primaryBtn, {width: '40%'}]}>
                <Text style={styles.btnText}>Confirmation</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {},
  modalView: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    maxHeight: '100%',
  },
  tripId: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: '5%',
    fontFamily: CairoRegular,
  },
  tripDetails: {
    fontSize: 18,
    // color: '#888',
    textAlign: 'center',
    marginBottom: 5,
    fontFamily: Cairo,
  },
  dateContainer: {
    borderWidth: 0.5,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    alignSelf: 'center',
    paddingVertical: '2%',
    borderRadius: 10,
    marginBottom: '5%',
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  rowBetweenSubContainer: {
    width: '50%',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: 'gray',
    // textAlign: 'center',
  },
  label2: {
    fontSize: 16,
    color: 'black',
    fontFamily: CairoSemiBold,
  },
  assignTruckLabel: {
    fontSize: 16,
    marginVertical: 12,
  },
  truckCard: {
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  truckCardSelected: {
    borderColor: 'red',
    // backgroundColor: '#f0f0f0',
  },
  truckRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  truckDetails: {
    marginLeft: 10,
    flex: 1,
  },
  truckPlate: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  truckDriver: {
    fontSize: 13,
    color: '#555',
    marginTop: 2,
  },
  truckType: {
    fontSize: 12,
    color: '#888',
    marginTop: 1,
  },
  truckPhone: {
    marginTop: 4,
    fontSize: 13,
    color: '#333',
  },
  primaryBtn: {
    backgroundColor: '#EC1E27',
    paddingVertical: 14,
    borderRadius: 20,
    marginVertical: 18,
    width: '50%',
  },
  confirmBtn: {
    backgroundColor: '#28a745',
    paddingVertical: 14,
    borderRadius: 6,
    marginTop: 20,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  confirmCard: {
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
  },
  line: {
    borderBottomWidth: 0.3,
    borderColor: 'gray',
    width: '95%',
    alignSelf: 'center',
    marginBottom: '5%',
  },
  truckContainer: {
    borderWidth: 0.5,
    padding: 5,
    paddingHorizontal: '5%',
    borderRadius: 10,
  },
  circle: {
    width: 15,
    height: 15,
    borderRadius: 50,
  },
});

export default BookTripModal;
