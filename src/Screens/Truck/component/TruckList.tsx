import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Pressable,
  Platform,
  Alert,
  Dimensions,
} from 'react-native';

import Driver from '../../../../assets/Images/Svg/Truck2.svg';
import {BlurView} from '@react-native-community/blur';
import AssignTruck from '../AssingingTheTruck';
import I18n from '../../../i18n';
import {CairoRegular, CairoSemiBold} from '../../../utils/fonts';
import {getItem} from '../../../utils/asyncStorage';
import {apiCall2} from '../../../API/CustomHook';
import {endpoint} from '../../../API/Endpoint';
import FastImage from 'react-native-fast-image';
import Entypo from 'react-native-vector-icons/Entypo';
import OptionModal from '../../Common/OptionModal';
import FloatingHelpButton from '../../Common/FloatingBtn';
import {useFocusEffect} from '@react-navigation/native';

export default function TruckListScreen({}) {
  const [modalData, setModalData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [optionModal, setOptionModal] = useState(false);
  const [assignTruck, setAssignTruck] = useState(false);
  const [addItem, setAddItem] = useState(false);
  const [data, setData] = useState([]);

  const handleModal = () => {
    setModalVisible(prev => !prev);
  };
  const closeModal = () => {
    setModalVisible(prev => !prev);
    setAssignTruck(false);
  };

  const closeOptionModal = () => {
    setOptionModal(prev => !prev);
  };

  useFocusEffect(
    useCallback(() => {
      const fucnCall = async () => {
        try {
          const auth = await getItem('auth');
          const response = await apiCall2({
            method: 'GET',
            endpoint: endpoint.GetTrucks,
            token: auth,
          });

          console.log(
            '✅ API response:',
            JSON.stringify(response.payload.payload, null, 2),
          );
          setData(response.payload.payload);
        } catch (error) {
          console.error('❌ Error in API call:', error);
        }
      };

      fucnCall();
      return () => {};
    }, []),
  );

  const truckTypeImages = {
    flatbed: require('../../../../assets/Images/Png/flatbed.png'),
    curtain: require('../../../../assets/Images/Png/curtain.png'),
    highside: require('../../../../assets/Images/Png/highside.png'),
    dyna: require('../../../../assets/Images/Png/dyna.png'),
    lorry: require('../../../../assets/Images/Png/lorry.png'),
    lowbed: require('../../../../assets/Images/Png/lowbed.png'),
  };

  const deleteHandler = async id => {
    const auth = await getItem('auth');
    const res = await apiCall2({
      method: 'POST',
      endpoint: `${endpoint.deleteTruck}?truckId=${id}`,
      token: auth,
      params: {},
    });
    console.log('res', JSON.stringify(res.payload.payload));
    const response = res.payload.payload;
    if (response) {
      Alert.alert('Deleted Succesfully');
      setOptionModal(false);
    }
    // setBookTripModalData(res.payload.payload);
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Driver />
        <Text style={[styles.header, {left: '55%'}]}>{I18n.t('truck')}</Text>
      </View>

      <View style={styles.line} />

      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              setModalData(item);
              setOptionModal(true);
              setAddItem(false);
            }}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={[
                  styles.cardContainer,
                  {
                    width: '20%',
                    borderWidth: 0.6,
                    padding: 10,
                    borderRadius: 10,
                    paddingVertical: 15,
                    borderColor: 'gray',
                  },
                ]}>
                {/* <Text style={styles.name}>{I18n.t('truck_type')}:</Text> */}
                {/* <Text style={styles.name}>{item?.truckTypeName}</Text> */}
                <FastImage
                  style={{width: '100%', height: 30}}
                  source={
                    truckTypeImages[item?.truckTypeName?.toLowerCase()] ||
                    require('../../../../assets/Images/Png/curtain.png')
                  }
                  resizeMode={FastImage.resizeMode.contain}
                />
              </View>

              <View
                style={[
                  styles.cardContainer,
                  {
                    width: '70%',
                    paddingHorizontal: '5%',
                  },
                ]}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <View
                    style={{
                      borderRadius: 10,
                      marginHorizontal: '1%',
                      paddingHorizontal: '2%',
                      backgroundColor: '#EEEEEE',
                    }}>
                    <Text style={[styles.containerText, {width: 'auto'}]}>
                      {/* {item.plateNumberAlpha} {item.platenumber} */}
                      {item.plateNumberAlpha} {item.platenumber}
                    </Text>
                  </View>
                  <Text style={{marginTop: '2.5%'}}>|</Text>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={[
                        styles.circle,
                        {
                          backgroundColor:
                            item?.colorName?.toLowerCase() || '#eee',
                        },
                      ]}
                    />
                    <Text style={styles.containerText}>{item.brandName}</Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <Text style={styles.containerText}>{item?.driverName}</Text>
                  <Text style={{marginTop: '2.5%'}}>|</Text>
                  <Text style={styles.containerText}>
                    {item.sequenceNumber}
                  </Text>
                </View>
              </View>

              <View style={[styles.cardContainer, {width: '10%'}]}>
                <Entypo name="dots-three-horizontal" size={15} />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          handleModal();
          setAddItem(true);
        }}>
        <Text style={styles.addText}>{I18n.t('addNew')}</Text>
      </TouchableOpacity>

      <Modal transparent visible={optionModal} animationType="fade">
        <Pressable
          style={styles.absolute}
          onPress={() => {
            closeOptionModal();
          }}>
          <BlurView
            style={styles.absolute}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          />
        </Pressable>

        <View style={[styles.modalView, {top: '65%'}]}>
          <OptionModal
            setAssign={setAssignTruck}
            setOptionModal={setOptionModal}
            viewModal={setModalVisible}
            deleteHandler={deleteHandler}
            modalData={modalData}
          />
        </View>
      </Modal>

      <Modal transparent visible={modalVisible} animationType="fade">
        <Pressable
          style={styles.absolute}
          onPress={() => {
            closeModal();
          }}>
          <BlurView
            style={styles.absolute}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          />
        </Pressable>

        <View style={styles.modalView}>
          <AssignTruck
            addItem={addItem}
            modaldata={modalData}
            assign={assignTruck}
          />
        </View>
      </Modal>

      <FloatingHelpButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  container2: {
    flexDirection: 'row',
    paddingTop: Platform.OS == 'ios' ? '10%' : '5%',
    alignItems: 'center',
  },
  cardContainer: {
    width: '33%',
    justifyContent: 'center',
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    paddingVertical: 16,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 9,
  },
  name: {
    fontSize: 16,
    fontFamily: CairoRegular,
  },
  addButton: {
    borderWidth: 1,
    borderRadius: 30,
    alignItems: 'center',
    borderColor: 'red',
    marginBottom: Platform.OS === 'ios' ? '30%' : '23%',
    padding: '2%',
    width: '70%',
    alignSelf: 'center',
    top: '2%',
  },
  addText: {
    color: 'red',
    fontSize: 16,
  },
  line: {
    borderBottomWidth: 0.8,
    borderColor: 'gray',
    width: '100%',
    alignSelf: 'center',
    marginVertical: '5%',
  },
  modalView: {
    height: '100%',
    position: 'absolute',
    top: '35%',
    alignSelf: 'center',
    width: '98%',
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 5,
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  absolute: {
    ...StyleSheet.absoluteFillObject,
  },
  containerText: {
    fontFamily: CairoSemiBold,
    // width: '45%',
    textAlign: 'center',
  },
  circle: {
    width: 15,
    height: 15,
    borderRadius: 50,
    marginTop: 6,
    // left: '30%',
    marginHorizontal: '5%',
  },
});
