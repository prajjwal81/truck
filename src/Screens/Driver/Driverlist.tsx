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
} from 'react-native';
import I18n from '../../i18n';
import Driver from '../../../assets/Images/Svg/Driver.svg';
import {BlurView} from '@react-native-community/blur';
import {getItem} from '../../utils/asyncStorage';
import {apiCall2} from '../../API/CustomHook';
import {endpoint} from '../../API/Endpoint';
import AssignDriver from './AssignDriver';
import DriverModal from './DriverModal';
import Entypo from 'react-native-vector-icons/Entypo';
import OptionModal from '../Common/OptionModal';
import {useFocusEffect} from '@react-navigation/native';

export default function DriversListScreen({}) {
  const [modalData, setModalData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [optionModal, setOptionModal] = useState(false);
  const [assignDriver, setAssignDriver] = useState(false);
  const [addItem, setAddItem] = useState(false);
  const [data, setData] = useState([]);

  const handleModal = () => {
    setAddItem(true);
    setModalVisible(prev => !prev);
  };
  const closeModal = () => {
    setModalVisible(prev => !prev);
    setModalData([]);
  };
  const closeModal2 = () => {
    setModalVisible2(prev => !prev);
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
            endpoint: endpoint.Driver,
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

  const deleteHandler = async id => {
    const auth = await getItem('auth');
    const res = await apiCall2({
      method: 'POST',
      endpoint: `${endpoint.deleteDriver}?driverId=${id}`,
      token: auth,
      params: {},
    });
    console.log('res', JSON.stringify(res.payload.payload));
    const response = res.payload.payload;
    if (response) Alert.alert('Deleted Succesfully');
    setOptionModal(false);
  };

  const modalHanlder = item => {
    setModalData(item);
    setOptionModal(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Driver />
        <Text style={[styles.header, {left: '55%'}]}>{I18n.t('drivers')}</Text>
      </View>

      <View style={styles.line} />

      <FlatList
        data={data}
        keyExtractor={(item, index) => item?.id?.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => modalHanlder(item)}>
            <View style={{flexDirection: 'row'}}>
              <View style={[styles.cardContainer, {width: '20%'}]}>
                {/* <Text style={styles.name}>{I18n.t('name')}:</Text> */}
                <Text>{/* {item.fisrtName} {item.lastName} */}</Text>
                <View style={styles.driverBox}>
                  <Driver />
                </View>
              </View>

              <View
                style={[
                  styles.cardContainer,
                  {
                    width: '70%',
                    marginTop: '5%',
                    justifyContent: 'space-between',
                    paddingHorizontal: '5%',
                  },
                ]}>
                {/* <Text>{I18n.t('idNumber')}:</Text> */}
                <View>
                  <Text>
                    {item.fisrtName} {item.lastName}
                  </Text>
                </View>
                <Text>|</Text>
                <Text style={{left: '3%'}}>{item.idNumber}</Text>
              </View>

              <View
                style={[styles.cardContainer, {width: '10%', marginTop: '5%'}]}>
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
        }}>
        <Text style={styles.addText}>{I18n.t('addNew')}</Text>
      </TouchableOpacity>

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
          <AssignDriver
            addItem={addItem}
            modalData={modalData}
            assign={assignDriver}
          />
        </View>
      </Modal>

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
            setAssign={setAssignDriver}
            setOptionModal={setOptionModal}
            viewModal={setModalVisible}
            deleteHandler={deleteHandler}
            modalData={modalData}
          />
        </View>
      </Modal>

      <Modal transparent visible={modalVisible2} animationType="fade">
        <Pressable
          style={styles.absolute}
          onPress={() => {
            setModalVisible2(prev => !prev);
          }}>
          <BlurView
            style={styles.absolute}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          />
        </Pressable>

        <View style={styles.modalView}>
          <DriverModal data={modalData} />
        </View>
      </Modal>
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
    paddingTop: Platform.OS == 'ios' ? '10%' : 0,
    alignItems: 'center',
  },
  cardContainer: {
    width: '33%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 9,
    paddingVertical: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
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
    borderBottomWidth: 0.3,
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
    width: '99%',
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    // alignItems: 'center',
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
  driverBox: {
    borderWidth: 0.5,
    borderColor: 'black',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 10,
  },
});
