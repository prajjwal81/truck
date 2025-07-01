import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomTextInput from '../Common/CustomTextInput';
import PrimaryButton from '../Common/Button';
import {useNavigation} from '@react-navigation/native';
import {apiCall, apiCall2} from '../../API/CustomHook';
import {getItem, setItem} from '../../utils/asyncStorage';
import FileModal from '../Common/fileModal';
import {endpoint} from '../../API/Endpoint';

const {width, height} = Dimensions.get('window');

const SignUp = () => {
  // State hooks for form data
  const [companyName, setCompanyName] = useState('');
  const [commercialNumber, setCommercialNumber] = useState('');
  const [vatNumber, setVatNumber] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState();
  const [vatCertificate, setVatCertificate] = useState();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();
  const [modal, setModal] = useState(false);
  const [returnVal, setReturnVal] = useState();
  const [selectedVal, setSelectedVal] = useState();

  const SignUpHandler = async () => {
    setLoading(true);
    const response = await apiCall(endpoint.CarrierLogin, 'POST', {
      id: 0,
      userName: 'string',
      profilePic: 'string',
      commercialNumber: commercialNumber,
      vatNumber: vatNumber,
      companyName: companyName,
      emailAddress: email,
      address: address,
      password: password,
      mobileNumber: mobile,
      documents: [
        {
          fileName: vatCertificate?.name,
          fileBase64: vatCertificate?.base64,
        },
        {
          fileName: registrationNumber?.name,
          fileBase64: registrationNumber?.base64,
        },
      ],
    });

    if (response.payload.payload.status) {
      navigation.navigate('BottomTabs');
    } else {
      setErrorMessage(response.header.result);
    }
    setLoading(false);
  };

  const FileModalHandler = () => {
    setModal(prev => !prev);
  };

  useEffect(() => {
    if (selectedVal === 'Vehicle Registration') {
      setRegistrationNumber(returnVal);
    } else if (selectedVal === 'Operating Card') {
      setVatCertificate(returnVal);
    }
  }, [returnVal]);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar backgroundColor="#EC1E27" barStyle="light-content" />
      <LinearGradient
        colors={['#EC1E27', '#F3767B', '#FFFFFF']}
        style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Welcome To Shipper Portal</Text>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.footer}
        showsVerticalScrollIndicator={false}>
        <CustomTextInput
          label="Company Name"
          value={companyName}
          onChangeText={setCompanyName}
        />

        <View style={styles.inputRow}>
          <CustomTextInput
            label="Commercial Number"
            value={commercialNumber}
            onChangeText={setCommercialNumber}
            half
          />
          <CustomTextInput
            label="VAT Number"
            value={vatNumber}
            onChangeText={setVatNumber}
            half
          />
        </View>

        <View style={styles.inputRow}>
          <CustomTextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            half
          />
          <CustomTextInput
            label="Mobile"
            value={mobile}
            onChangeText={setMobile}
            half
          />
        </View>

        <CustomTextInput
          label="Address"
          value={address}
          onChangeText={setAddress}
        />

        <View style={styles.inputRow}>
          <CustomTextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            half
          />
          <CustomTextInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            half
          />
        </View>

        <View style={styles.labelContainer}>
          <View>
            <Text style={styles.label}>Commercial Registration</Text>
            <Pressable
              style={styles.document}
              onPress={() => {
                FileModalHandler();
              }}>
              <View style={[styles.choose, {backgroundColor: '#F0F0F0'}]}>
                <Text style={[styles.chooseText, {fontSize: 12}]}>
                  Choose File
                </Text>
              </View>
              <View style={styles.choose}>
                <Text style={styles.chooseText}>No Choosen File</Text>
              </View>
            </Pressable>
          </View>
          <View>
            <Text style={[styles.label]}>VAT Certificate</Text>
            <Pressable
              style={styles.document}
              onPress={() => {
                FileModalHandler();
              }}>
              <View style={[styles.choose, {backgroundColor: '#F0F0F0'}]}>
                <Text style={[styles.chooseText, {fontSize: 12}]}>
                  Choose File
                </Text>
              </View>
              <View style={styles.choose}>
                <Text style={styles.chooseText}>No Choosen File</Text>
              </View>
            </Pressable>
          </View>
        </View>

        {/* <View style={styles.inputRow}>
          <CustomTextInput
            label="Commercial Registration"
            value={registrationNumber}
            onChangeText={setRegistrationNumber}
            half
          />
          <CustomTextInput
            label="VAT Certificate"
            value={vatCertificate}
            onChangeText={setVatCertificate}
            half
          />
        </View> */}

        <PrimaryButton
          onPress={() => SignUpHandler()}
          loading={loading}
          title="Create Account"
          errorMessage={errorMessage}
          style={{marginVertical: '5%', marginTop: '15%'}}
        />

        <View style={styles.signInTextContainer}>
          <Text style={{color: '#000'}}>Already have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              SignUpHandler();
              navigation.navigate('Login', {});
            }}>
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
        </View>

        <FileModal
          photoModal={modal}
          setPhotoModal={setModal}
          setReturnVal={setReturnVal}
        />
      </ScrollView>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    color: '#333',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 8,
    color: '#555',
    fontSize: 14,
  },
  footer: {
    padding: 20,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Ensures even spacing
    width: '100%',
  },
  button: {
    backgroundColor: '#D7262F',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signInTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signInText: {
    color: '#D7262F',
    fontWeight: 'bold',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '5%',
  },
  label: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    fontSize: 12,
    color: '#A1A1A1',
    marginBottom: '5%',
  },
  document: {
    borderWidth: 0.3,
    flexDirection: 'row',
    borderRadius: 5,
  },
  choose: {
    padding: 5,
    paddingVertical: '4%',
    justifyContent: 'center',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    marginBottom: 1,
    paddingHorizontal: 6,
  },
  chooseText: {
    fontSize: 10,
  },
});
