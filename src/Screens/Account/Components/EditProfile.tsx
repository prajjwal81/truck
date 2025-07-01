import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {endpoint} from '../../../API/Endpoint';
import {apiCall2} from '../../../API/CustomHook';
import {getItem} from '../../../utils/asyncStorage';
import I18n from '../../../i18n';

const EditProfile = () => {
  const route = useRoute();
  const {data} = route?.params;
  const [email, setEmail] = useState(data?.emailAddress);
  const [phone, setPhone] = useState(data?.phoneNumber);

  const submitHandler = async () => {
    if (data.phoneNumber == phone || data.emailAddress == email)
      Alert.alert('Please update the Email and Phone Number');
    const auth = await getItem('auth');
    const res = await apiCall2({
      method: 'POST',
      endpoint: endpoint.PostProfile,
      token: auth,
      params: {
        id: data?.id,
        userName: data?.userName,
        profilePic: data?.profilePic,
        commercialNumber: data?.commercialNumber,
        vatNumber: data?.vatNumber,
        isApproved: data?.isApproved,
        companyName: data?.companyName,
        phoneNumber: phone,
        emailAddress: email,
        country: data?.country,
        state: data?.state,
        city: data?.city,
        documents: data?.documents,
      },
    });
    console.log(res);
  };

  return (
    <View style={{flex: 1, paddingTop: '15%'}}>
      <Image
        source={require('../../../../assets/Images/Png/logoA.png')}
        style={{alignSelf: 'flex-end', right: '5%', width: 50, height: 50}}
      />
      <View style={styles.container}>
        {/* Top Profile Image */}
        <View style={styles.centered}>
          <Image
            source={require('../../../../assets/Images/Png/profile.png')}
            style={styles.profileImage}
          />
          <Text style={styles.companyName}>{data?.userName}</Text>
        </View>

        {/* Company Name */}

        {/* Email Input */}
        <Text style={styles.label}>{I18n.t('email')}</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} />

        {/* Phone Number */}
        <Text style={styles.label}>{I18n.t('phone_number')}</Text>
        <View style={styles.phoneContainer}>
          {/* <Image source={require('../assets/ksa.png')} style={styles.flagIcon} /> */}
          <Text style={styles.codeText}>+966</Text>
          <TextInput
            style={styles.phoneInput}
            value={phone}
            onChangeText={setPhone}
            keyboardType="number-pad"
          />
        </View>

        <TouchableOpacity
          style={styles.confirmBtn}
          onPress={() => {
            submitHandler();
          }}>
          <Text style={styles.confirmText}>{I18n.t('confirm')}</Text>
        </TouchableOpacity>

        <View style={styles.line} />

        {/* VAT Number + Tax Certificate */}
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.subLabel}>{I18n.t('vat_number')}</Text>
            <Text style={styles.valueText}>{data?.vatNumber}</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.subLabel}>{I18n.t('tax_certificate')}</Text>
            <View style={styles.attachmentRow}>
              <Text style={styles.pdfText}>itruck.pdf</Text>
            </View>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.subLabel}>
              {I18n.t('commercial_register_number')}
            </Text>
            <Text style={styles.valueText}>{data?.commercialNumber}</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.subLabel}>{I18n.t('commercial_register')}</Text>
            <View style={styles.attachmentRow}>
              <Text style={styles.pdfText}>itruck.pdf</Text>
            </View>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.subLabel}>{I18n.t('country')}</Text>
            <Text style={styles.valueText}>{data?.country}</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.subLabel}>{I18n.t('city')}</Text>
            <Text style={[styles.valueText, {fontWeight: '700'}]}>
              {data.city}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50,
    backgroundColor: '#fff',
    paddingTop: '5%',
    flex: 1,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  centered: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: '5%',
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 60,
    // marginVertical: 14,
  },
  companyName: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    // borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    borderRadius: 10,
    // marginBottom: 18,
    left: '20%',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    marginBottom: 14,
    borderColor: '#ccc',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  flagIcon: {
    width: 26,
    height: 16,
    marginRight: 10,
  },
  codeText: {
    fontSize: 14,
    marginRight: 10,
  },
  phoneInput: {
    fontSize: 14,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 10,
  },
  col: {
    flex: 1,
  },
  subLabel: {
    fontSize: 13,
    color: '#888',
    marginBottom: 4,
  },
  valueText: {
    fontSize: 14,
    color: '#000',
  },
  attachmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pdfIcon: {
    width: 22,
    height: 22,
  },
  pdfText: {
    fontSize: 13,
    color: '#444',
  },
  confirmBtn: {
    backgroundColor: '#e60000',
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 5,
    width: '60%',
    alignSelf: 'center',
  },
  confirmText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  line: {
    borderWidth: 0.5,
    height: 1,
    borderColor: 'gray',
    marginVertical: '6%',
  },
});

export default EditProfile;
