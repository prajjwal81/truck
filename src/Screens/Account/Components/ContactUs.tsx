import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import I18n from '../../../i18n';
import {CairoRegular, CairoSemiBold} from '../../../utils/fonts';
import {getItem} from '../../../utils/asyncStorage';
import {apiCall2} from '../../../API/CustomHook';
import {endpoint} from '../../../API/Endpoint';
import CustomTextInput from '../../Common/CustomTextInput';
import Icon3 from 'react-native-vector-icons/Feather';

const ContactUs = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const Handler = async () => {
    const auth = await getItem('auth');
    const res = await apiCall2({
      method: 'POST',
      endpoint: endpoint.HelpSupport,
      token: auth,
      params: {
        id: 0,
        subject: subject,
        email: email,
        description: description,
        userType: 0,
        userId: 0,
        replyMessage: '',
        requestType: 'Contact Us',
      },
    });
    console.log(res);
    const response = res.payload.payload;
    if (response) {
      Alert.alert('Your Request has been successfully sent');
      setEmail('');
      setDescription('');
      setSubject('');
    }
  };

  return (
    <View style={{flex: 1, paddingTop: '15%'}}>
      <Image
        source={require('../../../../assets/Images/Png/logoA.png')}
        style={{alignSelf: 'flex-end', right: '5%', width: 50, height: 50}}
      />
      <View style={styles.container}>
        <Text style={styles.title}>{I18n.t('contact_us')}</Text>
        <View style={styles.line} />

        <View style={{alignSelf: 'center', marginVertical: '5%'}}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{I18n.t('address')}</Text>
          </View>
          <View style={styles.textContainer}>
            <Icon3 name={'phone'} size={18} color="black" />
            <Text style={styles.text}>{I18n.t('phone_number')}</Text>
          </View>
          <View style={styles.textContainer}>
            <Icon3 name={'mail'} size={18} color="black" />
            <Text style={styles.text}>{I18n.t('email_address')}</Text>
          </View>
        </View>

        {/* <CustomTextInput
          label={I18n.t('name')}
          value={''}
          onChangeText={() => {}}
          secureTextEntry={false}
          half={false}
        /> */}
        <CustomTextInput
          label={I18n.t('email')}
          value={email}
          onChangeText={setEmail}
          secureTextEntry={false}
          half={false}
        />
        <CustomTextInput
          label={I18n.t('subject')}
          value={subject}
          onChangeText={setSubject}
          secureTextEntry={false}
          half={false}
        />
        <CustomTextInput
          label={I18n.t('message')}
          value={description}
          onChangeText={setDescription}
          secureTextEntry={false}
          half={false}
        />
        <TouchableOpacity style={styles.button} onPress={Handler}>
          <Text style={styles.buttonText}>{I18n.t('send')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginTop: 50,
    fontFamily: CairoSemiBold,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    marginTop: 16,
    fontFamily: CairoRegular,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
  },
  strengthBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 5,
  },
  bar: {
    height: 4,
    width: 40,
    borderRadius: 2,
  },
  goodText: {
    marginLeft: 10,
    fontSize: 12,
    color: '#666',
  },
  button: {
    backgroundColor: '#e32224',
    padding: 16,
    borderRadius: 50,
    marginTop: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  line: {
    height: 2,
    backgroundColor: '#EC1E27',
    borderRadius: 10,
    width: '30%',
    alignSelf: 'center',
    marginTop: '2%',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  text: {
    fontFamily: CairoRegular,
    fontSize: 17,
  },
});
