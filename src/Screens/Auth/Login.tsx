import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
  Image,
  Pressable,
} from 'react-native';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import SimpleReactValidator from 'simple-react-validator';
import {useNavigation, useRoute} from '@react-navigation/native';
import {CairoSemiBold} from '../../utils/fonts';
import CheckBox from '@react-native-community/checkbox';
import PrimaryButton from '../Common/Button';
import I18n from '../../i18n';
import {apiCall} from '../../API/CustomHook';
import {endpoint} from '../../API/Endpoint';
import {getItem, setItem} from '../../utils/asyncStorage';

const Login = ({}) => {
  const [nm_email, setNmEmail] = useState('c@m.com');
  const [nm_password, setNmPassword] = useState('123456789');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const validator = new SimpleReactValidator({autoForceUpdate: () => {}});
  const navigation = useNavigation();
  const route = useRoute();
  const selectedRole = route.params?.selectedRole;
  const [loclaLang, setLocalLang] = useState('ar');

  useEffect(() => {
    const funcCall = async () => {
      const lang = await getItem('APP_LANGUAGE');
      setLocalLang(lang);
    };
    funcCall();
  }, []);

  const loginHandler = async () => {
    try {
      setLoading(true);
      const response = await apiCall(endpoint.CarrierLogin, 'POST', {
        userName: nm_email,
        password: nm_password,
      });
      if (response.payload.status) {
        setItem('auth', response?.payload?.payload?.token);
        navigation.navigate('BottomTabs');
      } else {
        setErrorMessage(response.header.result);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
        <LinearGradient
          colors={['#EC1E27', '#F3767B', '#F3767B', '#F3767B', '#FFFFFF']}
          style={styles.container}>
          <StatusBar backgroundColor="#208bdc" barStyle="light-content" />
          <View style={styles.header}>
            <Image source={require('../../../assets/Images/Png/logo1.png')} />
            <Image source={require('../../../assets/Images/Png/logoA.png')} />
            <Image source={require('../../../assets/Images/Png/logo2.png')} />
          </View>

          <Animatable.View
            animation="fadeInUpBig"
            style={[styles.footer, {backgroundColor: '#fff'}]}>
            <View>
              <Text style={styles.text_header}>{I18n.t('welcome_back')}</Text>
              <Text style={styles.text_header2}>
                {I18n.t('login_to_account')}
              </Text>

              <View style={styles.inputMainContainer}>
                <Text style={styles.label}>
                  {I18n.t('email_or_commercial_id')}
                </Text>
                <TextInput
                  value={nm_email}
                  onChangeText={setNmEmail}
                  style={styles.inputNew}
                  placeholderTextColor="#aaa"
                  multiline
                  textAlignVertical="top"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputMainContainer}>
                <Text style={styles.label}>{I18n.t('password')}</Text>
                <TextInput
                  value={nm_password}
                  onChangeText={setNmPassword}
                  style={styles.inputNew}
                  placeholderTextColor="#aaa"
                  multiline
                  textAlignVertical="top"
                  autoCapitalize="none"
                />
              </View>

              <Text style={styles.validatorMessage}>
                {validator.message('Password', nm_password, 'required')}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '5%',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <CheckBox
                    disabled={false}
                    value={rememberMe}
                    onValueChange={newValue => setRememberMe(newValue)}
                    tintColors={{true: '#EC1E27', false: '#aaa'}}
                  />
                  <Text style={{marginLeft: 8}}>{I18n.t('remember_me')}</Text>
                </View>

                <TouchableOpacity
                  onPress={() => navigation.navigate('ForgotPass')}>
                  <Text style={{color: '#EC1E27'}}>
                    {I18n.t('forgot_password')}?
                  </Text>
                </TouchableOpacity>
              </View>

              <PrimaryButton
                onPress={() => loginHandler()}
                loading={loading}
                title={I18n.t('signin')}
                errorMessage={errorMessage}
                style={{marginVertical: '5%'}}
              />

              <Text style={{textAlign: 'center'}}>
                {I18n.t('no_account')}
                <Pressable onPress={() => navigation.navigate('SignUp')}>
                  <Text
                    style={{
                      textDecorationLine: 'underline',
                      color: '#EC1E27',
                      left: loclaLang == 'ar' ? '120%' : '2%',
                    }}>
                    {' '}
                    {I18n.t('signup')}
                  </Text>
                </Pressable>
              </Text>
            </View>
          </Animatable.View>
        </LinearGradient>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#836FFF',
    justifyContent: 'space-around',
  },
  header: {
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    flexDirection: 'row',
    marginTop: '25%',
  },
  footer: {
    flex: 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: 'black',
    fontFamily: CairoSemiBold,
    fontSize: 34,
    textAlign: 'center',
  },
  text_header2: {
    color: 'gray',
    fontFamily: CairoSemiBold,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: '10%',
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  inputMainContainer: {
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    position: 'relative',
    borderWidth: 0.5,
    borderColor: 'gray',
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
    textAlignVertical: 'top',
    minHeight: 50,
    paddingTop: '5%',
  },
  icon: {
    marginRight: 8,
  },
});
