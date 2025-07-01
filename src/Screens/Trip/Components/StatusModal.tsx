import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {CairoSemiBold} from '../../../utils/fonts';
import Location from '../../../../assets/Images/Svg/geoBW.svg';
import Eye from '../../../../assets/Images/Svg/VisibleBW.svg';
import Star from '../../../../assets/Images/Svg/StarBW.svg';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import {getItem} from '../../../utils/asyncStorage';
import {apiCall2} from '../../../API/CustomHook';
import {endpoint} from '../../../API/Endpoint';
import {OtpInput} from 'react-native-otp-entry';
import PrimaryButton from '../../Common/Button';

const {height} = Dimensions.get('window');

const StatusModal = ({
  data,
  setBookTripModalVisible,
  setModalVisible,
  setViewTripModalVisible,
  setConfirmationTripModalVisible = false,
  setCancelTrip,
  modalData,
}) => {
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [generatedOtpId, setGeneratedOtpId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');

  const nextBookModalHandler = () => {
    setBookTripModalVisible(true);
    setModalVisible(false);
  };

  const ConfirmationModal = () => {
    setConfirmationTripModalVisible(true);
    setModalVisible(false);
  };

  const viewModalHandler = () => {
    setViewTripModalVisible(true);
    setModalVisible(false);
  };

  const cancelTrip = () => {
    setCancelTrip(true);
    ConfirmationModal();
  };

  const handleCompleteTrip = async () => {
    try {
      const auth = await getItem('auth');
      const res = await apiCall2({
        method: 'POST',
        endpoint: endpoint.GenerateOTP,
        token: auth,
        params: {
          tripId: modalData?.tripId,
          tripNumber: modalData?.tripNumber,
          status: 5,
          deliveryCode: 0,
        },
      });

      const response = res?.payload?.payload;
      if (response) {
        setGeneratedOtpId(response.otpId);
        setShowOtpInput(true);
      }
    } catch (error) {
      Alert.alert('Failed to generate OTP');
    }
  };

  const verifyOtpHandler = async otp => {
    try {
      const auth = await getItem('auth');
      const res = await apiCall2({
        method: 'POST',
        endpoint: endpoint.VerfiyOTP,
        token: auth,
        params: {
          tripId: modalData?.tripId,
          tripNumber: modalData?.tripNumber,
          status: 6,
          deliveryCode: otp,
        },
      });
      console.log(res);
      if (res?.payload?.status) {
        Alert.alert('Trip completed successfully!');
        setShowOtpInput(false);
        setModalVisible(false);
      } else {
        Alert.alert(res?.header?.result);
      }
    } catch (error) {
      console.error('❌ OTP Verification Failed:', error);
      Alert.alert('Something went wrong');
    }
  };

  return (
    <View style={styles.modalView}>
      <View style={styles.line} />

      {showOtpInput ? (
        <>
          <Text
            style={[
              styles.btnText,
              {
                fontSize: 15,
                lineHeight: 20,
                color: '#0000004D',
                paddingVertical: '10%',
                paddingHorizontal: '5%',
              },
            ]}>
            We have sent the verification code to your phone number to confirm
            complete trip
          </Text>
          <OtpInput
            numberOfDigits={4}
            focusColor="green"
            onTextChange={text => setEnteredOtp(text)} // <-- update state
            secureTextEntry={false}
            textInputProps={{keyboardType: 'numeric'}}
            theme={{
              containerStyle: {marginBottom: 20, justifyContent: 'center'},
              pinCodeContainerStyle: {
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 10,
                backgroundColor: 'white',
                width: 60,
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 5,
              },
              pinCodeTextStyle: {
                fontSize: 22,
                fontWeight: 'bold',
                color: '#000',
              },
              focusedPinCodeContainerStyle: {
                borderWidth: 2,
                borderColor: 'green',
              },
            }}
          />

          {/* <Pressable onPress={() => setShowOtpInput(false)}>
            <Text style={{color: 'red', textAlign: 'center'}}>Cancel</Text>
          </Pressable> */}
          <PrimaryButton
            onPress={() => {
              verifyOtpHandler(enteredOtp);
            }}
            loading={loading}
            title={'Continue'}
            errorMessage={''}
            style={{}}
          />
          <Pressable onPress={handleCompleteTrip}>
            <Text style={{color: 'red', textAlign: 'center', marginTop: 10}}>
              Request New OTP
            </Text>
          </Pressable>
        </>
      ) : (
        <>
          {data?.toLowerCase() === 'ongoing' && (
            <Pressable style={styles.btn} onPress={handleCompleteTrip}>
              <Icon3 name={'check'} size={25} color="green" />
              <Text style={[styles.btnText, {color: 'green'}]}>
                Completed Trips
              </Text>
            </Pressable>
          )}

          {(data?.toLowerCase() === 'booked' ||
            data?.toLowerCase() === 'pending') && (
            <Pressable
              style={styles.btn}
              onPress={() => {
                data?.toLowerCase() === 'booked'
                  ? ConfirmationModal()
                  : nextBookModalHandler();
              }}>
              <Location />
              <Text style={styles.btnText}>
                {data?.toLowerCase() === 'booked' ? 'Start Trip' : 'Book Trip'}
              </Text>
            </Pressable>
          )}

          <Pressable
            style={[styles.btn, {marginTop: '5%'}]}
            onPress={viewModalHandler}>
            <Eye />
            <Text style={styles.btnText}>View Trip</Text>
          </Pressable>

          {(data?.toLowerCase() === 'ongoing' ||
            data?.toLowerCase() === 'delivered') && (
            <Pressable style={styles.btn}>
              <Star />
              <Text style={styles.btnText}>Favourite Destination</Text>
            </Pressable>
          )}

          {data?.toLowerCase() !== 'cancelled' && (
            <Pressable style={styles.btn} onPress={cancelTrip}>
              <Icon3 name={'cancel'} size={25} color="red" />
              <Text style={[styles.btnText, {color: 'red'}]}>Cancel Trip</Text>
            </Pressable>
          )}
        </>
      )}
    </View>
  );
};

export default StatusModal;

const styles = StyleSheet.create({
  btn: {
    height: height / 13,
    borderWidth: 0.8,
    borderRadius: 20,
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
    width: '95%',
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    elevation: 5,
    paddingTop: '5%',
    justifyContent: 'flex-end',
    paddingBottom: '15%',
    position: 'absolute',
    bottom: 0,
  },
  line: {
    width: '20%',
    alignSelf: 'center',
    height: 4,
    backgroundColor: '#E4E4E4',
    borderRadius: 10,
  },
});
