import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
  Dimensions,
  Platform,
  Pressable,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Cairo, CairoBold, CairoRegular, CairoSemiBold} from '../../utils/fonts';
import Customer from '../../../assets/Images/Svg/CustomerService.svg';
import Salesperson from '../../../assets/Images/Svg/salesperson.svg';
import Qa from '../../../assets/Images/Svg/Qa.svg';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {clearItem, getItem} from '../../utils/asyncStorage';
import I18n from '../../i18n';
import {apiCall2} from '../../API/CustomHook';
import {endpoint} from '../../API/Endpoint';
import {Modal} from 'react-native-paper';
import {BlurView} from '@react-native-community/blur';
import {StackNavigationProp} from '@react-navigation/stack';

const {width, height} = Dimensions.get('window');
type RootStackParamList = {
  LoginAsScreen: undefined;
  // other screens...
};

const Accounts = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [data, setData] = useState();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const fucnCall = async () => {
      try {
        const auth = await getItem('auth');
        console.log('📦 Token from AsyncStorage:', auth);

        const response = await apiCall2({
          method: 'GET',
          endpoint: endpoint.Profile,
          token: auth,
        });

        console.log(
          '✅ API response:',
          endpoint.Profile,
          JSON.stringify(response.payload.payload, null, 2),
        );
        setData(response.payload.payload);
      } catch (error) {
        console.error('❌ Error in API call:', error);
      }
    };

    fucnCall();
  }, []);

  return (
    <View style={styles.container}>
      {/* Top Title */}
      <View style={styles.header}>
        <EvilIcons name="gear" size={34} color="black" />
        <Text style={styles.heading}>{I18n.t('settings')}</Text>
      </View>

      <View style={styles.line} />

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <Image
          source={require('../../../assets/Images/Png/profile.png')}
          style={styles.profileImage}
        />
        <View style={{flex: 1}}>
          <Text style={styles.companyText}>{data?.userName}</Text>
          <TouchableOpacity
            style={styles.editRow}
            onPress={() => {
              navigation.navigate('EditProfile', {data: data});
            }}>
            <EvilIcons name="pencil" size={24} color="black" />
            <Text style={styles.editText}>{I18n.t('edit_file')}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Options */}

      <TouchableOpacity
        style={styles.option}
        onPress={() => {
          setModal(true);
        }}>
        <Salesperson />
        <Text style={[styles.optionText, {marginLeft: '5%'}]}>
          {I18n.t('salesPerson')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => {
          navigation.navigate('ContactUs');
        }}>
        <Customer />
        <Text style={[styles.optionText, {marginLeft: '5%'}]}>
          {I18n.t('contact_us')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.option, {paddingLeft: '6%'}]}
        onPress={() => {
          navigation.navigate('Faq');
        }}>
        <Qa />
        <Text style={[styles.optionText, {marginLeft: '5%'}]}>
          {I18n.t('faq')}
        </Text>
      </TouchableOpacity>

      <View style={[styles.line, {marginBottom: 15, marginTop: 15}]} />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('LanguageSelector');
        }}
        style={[styles.option, {justifyContent: 'space-between'}]}>
        <Text style={styles.optionText}>{I18n.t('language')}</Text>
        <Text style={styles.arrow}>{'>'}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('NotificationScreen');
        }}
        style={[styles.option, {justifyContent: 'space-between'}]}>
        <Text style={styles.optionText}>{I18n.t('notification')}</Text>
        <Text style={styles.arrow}>{'>'}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.option, {justifyContent: 'space-between'}]}
        onPress={() => {
          navigation.navigate('PasswordResetScreen');
        }}>
        <Text style={styles.optionText}>{I18n.t('changePassword')}</Text>
        <Text style={styles.arrow}>{'>'}</Text>
      </TouchableOpacity>

      {/* <View style={[styles.option, {justifyContent: 'space-between'}]}>
        <Text style={styles.optionText}>{I18n.t('night_mode')}</Text>
        <Switch
          value={nightMode}
          onValueChange={setNightMode}
          thumbColor={'#fff'}
          trackColor={{false: '#ccc', true: '#999'}}
        />
      </View> */}

      {/* Sign out */}
      <TouchableOpacity
        style={styles.signOutBtn}
        onPress={() => {
          clearItem('auth');
          // navigation.replace('LoginAsScreen');
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'LoginAsScreen'}],
            }),
          );
        }}>
        <Entypo name="export" size={24} color="white" style={{right: '25%'}} />
        <Text style={styles.signOutText}>{I18n.t('sign_out')}</Text>
      </TouchableOpacity>

      <Modal visible={modal} onDismiss={() => setModal(false)} style={{}}>
        <Pressable
          style={[
            styles.fakeHeight,
            {height: Platform.OS === 'android' ? '57%' : '60%'},
          ]}
          onPress={() => setModal(false)}>
          <BlurView
            style={styles.absolute}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          />
        </Pressable>

        <View style={styles.modalContent}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Salesperson />
            <Text style={{fontFamily: CairoBold, fontSize: 21}}>
              Sales Person
            </Text>
          </View>
          <View style={styles.line} />
          <View>
            <View>
              <Text style={styles.modalHeadingText}>{I18n.t('name')}</Text>
              <Text style={styles.modalText}>{data?.userName}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={styles.modalHeadingText}>{I18n.t('email')}</Text>
              <Text style={styles.modalText}>{data?.commercialNumber}</Text>
            </View>
            <View>
              <Text style={styles.modalHeadingText}>
                {I18n.t('phoneNumber')}
              </Text>
              <Text style={styles.modalText}>{data?.emailAddress}</Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    paddingTop: Platform.OS == 'ios' ? '15%' : 0,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    fontSize: 27,
    marginLeft: '5%',
    fontFamily: CairoSemiBold,
    color: 'black',
  },
  profileCard: {
    borderColor: '#f00',
    borderWidth: 1,
    borderRadius: 12,
    padding: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  profileImage: {
    width: '20%',
    height: height / 12,
    borderRadius: 30,
    marginRight: 14,
  },
  companyText: {
    fontSize: 16,
    fontFamily: CairoSemiBold,
    color: 'black',
  },
  editRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  editText: {
    fontSize: 13,
    color: '#999',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '3%',
    paddingHorizontal: 14,
    borderRadius: 12,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#eee',
  },
  optionText: {
    fontSize: 15,
    fontFamily: CairoSemiBold,
    color: 'black',
  },
  arrow: {
    fontSize: 18,
    color: '#999',
  },
  signOutBtn: {
    backgroundColor: '#EC1E27',
    paddingVertical: 14,
    borderRadius: 50,
    marginTop: 28,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    alignSelf: 'center',
  },
  signOutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  line: {
    borderBottomWidth: 0.3,
    borderColor: 'gray',
    width: '100%',
    alignSelf: 'center',
    marginVertical: '3%',
    marginBottom: '5%',
  },
  fakeHeight: {
    height: height / 1,
    backgroundColor: 'rgba(100, 100, 100, 0.5)',
  },
  absolute: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    // backgroundColor: 'rgba(100, 100, 100, 0.5)',
    backgroundColor: 'white',
    padding: 40,
    width: width + 30,
    height: height,
    right: '5%',
    gap: 10,
    // position: 'absolute',
  },
  modalText: {
    fontFamily: CairoSemiBold,
    fontSize: 18,
    color: 'black',
  },
  modalHeadingText: {
    fontFamily: CairoRegular,
    fontSize: 15,
    color: 'gray',
  },
});

export default Accounts;
