import React from 'react';
import {
  Alert,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {CairoSemiBold} from '../../../utils/fonts';
import {getItem} from '../../../utils/asyncStorage';
import {apiCall2} from '../../../API/CustomHook';
import {endpoint} from '../../../API/Endpoint';

const {height, width} = Dimensions.get('window');

const ConfirmationModal = ({
  data,
  setConfirmationTripModalVisible,
  cancel = false,
}) => {
  const submitHandler = async () => {
    const auth = await getItem('auth');

    const res = await apiCall2({
      method: 'POST',
      endpoint: endpoint.PostTripStatusUpdate,
      token: auth,
      params: {
        tripId: data?.tripId,
        tripNumber: data?.tripNumber,
        status: cancel ? 7 : 0,
        deliveryCode: 0,
      },
    });
    // console.log(res.payload.payload);
    if (res.payload.status) {
      setConfirmationTripModalVisible(false);
      Alert.alert(res.payload.payload);
    }
  };

  return (
    <View style={styles.modalView}>
      <Text style={styles.text}>
        Are you sure you want to {cancel ? 'Cancel' : 'Start'} the trip ?
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '90%',
        }}>
        <Pressable
          style={[styles.btn]}
          onPress={() => {
            setConfirmationTripModalVisible(false);
          }}>
          <Text style={styles.btnText}>Cancel</Text>
        </Pressable>
        <Pressable
          style={[styles.btn, {width: '50%', backgroundColor: '#EC1E27'}]}
          onPress={() => {
            submitHandler();
          }}>
          <Text style={[styles.btnText, {color: 'white'}]}>Confirm</Text>
        </Pressable>
      </View>
    </View>
  );
};
export default ConfirmationModal;

const styles = StyleSheet.create({
  btn: {
    height: height / 19,
    borderWidth: 0.8,
    borderRadius: 30,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#EC1E27',
    width: '40%',
  },
  btnText: {
    fontFamily: CairoSemiBold,
    fontSize: 18,
    left: '10%',
  },
  modalView: {
    top: '95%',
    alignSelf: 'center',
    width: '90%',
    paddingHorizontal: '5%',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '10%',
    paddingBottom: '10%',
  },
  text: {
    textAlign: 'center',
    fontFamily: CairoSemiBold,
    fontSize: 15,
    color: 'black',
    marginBottom: '5%',
  },
});
