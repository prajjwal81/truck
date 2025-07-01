import React from 'react';
import {
  Alert,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {CairoBold, CairoRegular, CairoSemiBold} from '../../utils/fonts';
import Truck from '../../../assets/Images/Svg/Truck.svg';
import Eye from '../../../assets/Images/Svg/VisibleBW.svg';
import Icon3 from 'react-native-vector-icons/AntDesign';
import {getItem} from '../../utils/asyncStorage';
import {apiCall2} from '../../API/CustomHook';
import {endpoint} from '../../API/Endpoint';
import I18n from '../../i18n';
const {height, width} = Dimensions.get('window');
const OptionModal = ({
  viewModal,
  setOptionModal,
  setAssign,
  driver = false,
  deleteHandler,
  modalData,
}) => {
  const UnassignHandler = async (truckId, driverId) => {
    try {
      const auth = await getItem('auth');
      const response = await apiCall2({
        method: 'POST',
        endpoint: `${endpoint.unassignTruck}?driverId=${driverId}&truckId=${truckId}`,
        token: auth,
      });

      console.log('✅ API response:', JSON.stringify(response, null, 2));
      if (response.payload.status) {
        Alert.alert('Unassigned successfully');
      }
      setOptionModal(false); // Close modal after success
    } catch (error) {
      console.error('❌ Error in API call:', error);
      Alert.alert('Failed to unassign');
    }
  };

  return (
    <View style={styles.modalView}>
      <View style={styles.line} />

      <Pressable
        style={styles.btn}
        onPress={() => {
          setOptionModal(false);
          viewModal(true);
        }}>
        <Eye />
        <Text style={styles.btnText}>
          {driver ? I18n.t('view_driver') : I18n.t('view_truck')}
        </Text>
      </Pressable>

      <Pressable
        style={styles.btn}
        onPress={() => {
          if (modalData?.truckId || modalData?.driverId) {
            const truckId = modalData?.truckId || 0;
            const driverId = modalData?.driverId || 0;
            console.log('Unassigning >> Truck:', truckId, 'Driver:', driverId);
            UnassignHandler(truckId, driverId);
          } else {
            setAssign(true);
            setOptionModal(false);
            viewModal(true);
          }
        }}>
        <Truck />
        <Text style={styles.btnText}>
          {modalData.truckId !== '' || modalData.driverId !== ''
            ? driver
              ? I18n.t('unassign_truck')
              : I18n.t('unassign_driver')
            : driver
            ? I18n.t('assign_truck')
            : I18n.t('assign_driver')}
        </Text>
      </Pressable>

      <Pressable
        style={styles.btn}
        onPress={() => {
          deleteHandler(modalData?.id);
        }}>
        <Icon3 name={'delete'} size={18} color="red" />
        <Text style={[styles.btnText, {color: 'red'}]}>{I18n.t('delete')}</Text>
      </Pressable>
    </View>
  );
};
export default OptionModal;

const styles = StyleSheet.create({
  btn: {
    height: height / 13,
    borderWidth: 0.8,
    borderRadius: 25,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: 'black',
    gap: 10,
  },
  btnText: {
    fontFamily: CairoSemiBold,
    fontSize: 18,
  },
  modalView: {
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    paddingTop: '5%',
  },
  line: {
    width: '20%',
    alignSelf: 'center',
    height: 4,
    backgroundColor: '#E4E4E4',
    borderRadius: 10,
  },
});
