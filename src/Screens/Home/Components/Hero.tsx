import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  Dimensions,
  Pressable,
  Platform,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Truck from '../../../../assets/Images/Svg/Truck2.svg';
import Truck2 from '../../../../assets/Images/Svg/Truck.svg';
import Driver from '../../../../assets/Images/Svg/Driver.svg';
import Star from '../../../../assets/Images/Svg/Star.svg';
import Logo from '../../../../assets/Images/Svg/logoa.svg';
import Price from '../../../../assets/Images/Svg/Price list.svg';
import Location from '../../../../assets/Images/Svg/Placeholder.svg';
import Box from '../../../../assets/Images/Svg/Box.svg';
import {CairoRegular, CairoSemiBold} from '../../../utils/fonts';
import {useNavigation} from '@react-navigation/native';
import {apiCall2} from '../../../API/CustomHook';
import {endpoint} from '../../../API/Endpoint';
import {getItem} from '../../../utils/asyncStorage';
import Icon from 'react-native-vector-icons/Ionicons';
import FloatingHelpButton from '../../Common/FloatingBtn';
import I18n from '../../../i18n';
import {BlurView} from '@react-native-community/blur';
import StatusModal from '../../Trip/Components/StatusModal';
import BookTripModal from '../../Trip/Components/BooktripModalScreen';
import OrderCard from '../../Trip/Components/ViewTripModal';

const {width} = Dimensions.get('window');
const cardWidth = width / 2.2; // 2 cards half screen visible

const HomeScreenHero = () => {
  const navigation = useNavigation();
  const [data, setData] = useState({});
  const [pending, setPending] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [modalData, setModalData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [modalActiveTab, setModalActiveTab] = useState();
  const [bookTripModalVisible, setBookTripModalVisible] = useState(false);
  const [bookTripModalData, setBookTripModalData] = useState();
  const [viewTripModalVisible, setViewTripModalVisible] = useState(false);

  useEffect(() => {
    const fucnCall = async () => {
      try {
        const auth = await getItem('auth');
        console.log('📦 Token from AsyncStorage:', auth);

        const response = await apiCall2({
          method: 'GET',
          endpoint: endpoint.CarrierDashboard,
          token: auth,
        });

        console.log(
          '✅ API response:',
          JSON.stringify(response.payload.payload),
        );
        setData(response.payload.payload);
      } catch (error) {
        console.error('❌ Error in API call:', error);
      }
    };

    fucnCall();
  }, []);

  useEffect(() => {
    const fucnCall = async () => {
      try {
        const auth = await getItem('auth');
        console.log('📦 Token from AsyncStorage:', auth);
        const response = await apiCall2({
          method: 'POST',
          endpoint: endpoint.GetCarrierTrips,
          //  have to chanvge the API with GetCarrrierTrips
          token: auth,
          params: {
            status: 1,
            userRole: 0,
            userId: 0,
            truckTypeId: 0,
            search: '',
            searchType: 0,
            loadingCity: '',
            unloadingCity: '',
          },
        });

        console.log(
          '✅ API response Pending:',
          JSON.stringify(response.payload.payload),
        );
        setPending(response?.payload?.payload);
      } catch (error) {
        console.error('❌ Error in API call:', error);
      }
    };

    fucnCall();
  }, []);

  useEffect(() => {
    const fucnCall = async () => {
      try {
        const auth = await getItem('auth');
        console.log('📦 Token from AsyncStorage:', auth);

        const response = await apiCall2({
          method: 'POST',
          endpoint: endpoint.GetCarrierTrips,
          //  have to chanvge the API with GetCarrrierTrips
          token: auth,
          params: {
            status: 5,
            userRole: 0,
            userId: 0,
            truckTypeId: 0,
            search: '',
            searchType: 0,
            loadingCity: '',
            unloadingCity: '',
          },
        });

        console.log(
          '✅ API response Pending:',
          JSON.stringify(response.payload.payload),
        );
        setOngoing(response?.payload?.payload);
      } catch (error) {
        console.error('❌ Error in API call:', error);
      }
    };

    fucnCall();
  }, []);

  const TripCard = ({trip}) => {
    return (
      <Pressable
        style={{paddingTop: '3%'}}
        onPress={() => {
          setModalVisible(true);
          setModalActiveTab(trip.status.toLowerCase());
          cardDetailHandler(trip.tripId);
          setModalData(trip);
        }}>
        <View style={[styles.badge]}>
          <Text style={styles.badgeText}>{trip.status}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.tripId}>{trip.tripNumber}</Text>
          <Text style={styles.date}>{trip.date}</Text>
          <View style={styles.lineContainer}>
            <Text style={styles.date}>{I18n.t('loading')}</Text>
            <Text style={styles.date}>{I18n.t('unloading')}</Text>
          </View>
          <View style={styles.locations}>
            <View style={styles.dot} />
            <View style={styles.line} />
            <Location />
          </View>
          <View style={[styles.lineContainer, {marginTop: '5%'}]}>
            <Text style={styles.locationText}>{trip.pickUpCity}</Text>
            <Text style={styles.locationText}>{trip.dropOffCity}</Text>
          </View>

          <View style={styles.bottomBox}>
            <View style={styles.infoBox}>
              <Box />
              <Text style={styles.label}>{I18n.t('productType')}</Text>
              <Text style={styles.value}>{trip?.product?.split(' ')[0]}</Text>
            </View>
            <View style={styles.infoBox}>
              <Price />
              <Text style={styles.label}>{I18n.t('price')}</Text>
              <Text style={styles.value}>{trip.price}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  const cardDetailHandler = async id => {
    const auth = await getItem('auth');
    const res = await apiCall2({
      method: 'GET',
      endpoint: `${endpoint.TripDetailByID}/${id}`,
      token: auth,
      params: {},
    });
    console.log('res', JSON.stringify(res.payload.payload));
    setBookTripModalData(res.payload.payload);
  };

  const closeModal = () => {
    setModalVisible(prev => !prev);
  };
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#EC1E27', '#F3767B']} style={styles.header}>
        {/* <Bell /> */}
        <Pressable
          style={styles.profile}
          onPress={() => {
            navigation.navigate('Accounts');
          }}>
          <Icon name="person-outline" size={30} color="black" />
        </Pressable>
        <Logo />
      </LinearGradient>
      {/* Top Buttons */}
      <View style={styles.topMenu}>
        <TouchableOpacity
          style={styles.menuBtn}
          onPress={() => {
            navigation.navigate('TruckListScreen');
          }}>
          <Truck />
          <Text style={[styles.menutext, {marginTop: '10%'}]}>
            {' '}
            {data?.truckCount}
          </Text>
          <Text style={styles.menutext}>{I18n.t('truck')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuBtn}
          onPress={() => {
            navigation.navigate('DriversListScreen');
          }}>
          <Driver />
          <Text style={[styles.menutext, {marginTop: '10%'}]}>
            {data?.driverCount}
          </Text>
          <Text style={styles.menutext}> {I18n.t('driver')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuBtn}
          onPress={() => {
            navigation.navigate('FavoriteList');
          }}>
          <Star />
          <Text style={[styles.menutext, {marginTop: '10%'}]}>
            {' '}
            {data?.tripsCount}
          </Text>
          <Text style={styles.menutext}> {I18n.t('favourite')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.horizonatalLine} />

      <View style={{height: '30%'}}>
        {/* Pending Section */}
        <View style={styles.sectionHeader}>
          <View style={[styles.sectionHeader, {alignItems: 'center'}]}>
            <Truck2 />
            <Text style={[styles.sectionTitle, {left: 10}]}>
              {I18n.t('pending')}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.showallContainer}
            onPress={() => {
              navigation.navigate('TripStack', {status: 'pending'});
            }}>
            <Text style={styles.showAll}>{I18n.t('showAll')}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={pending}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => <TripCard trip={item} />}
        />
      </View>

      {/* Ongoing Section */}
      <View style={{height: '30%'}}>
        <View style={styles.sectionHeader}>
          <Pressable
            style={[styles.sectionHeader, {alignItems: 'center'}]}
            onPress={() => {
              // navigation.navigate('Trip', {status: 'booked'});
            }}>
            <Truck2 />
            <Text style={[styles.sectionTitle, {left: 10}]}>
              {I18n.t('ongoing')}
            </Text>
          </Pressable>
          <TouchableOpacity
            style={styles.showallContainer}
            onPress={() => {
              navigation.navigate('TripStack', {status: 'ongoing'});
            }}>
            <Text style={styles.showAll}>{I18n.t('showAll')}</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={ongoing}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => <TripCard trip={item} />}
        />
      </View>

      <FloatingHelpButton />

      <Modal transparent visible={modalVisible} animationType="slide">
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
        {/* <BookTripModal /> */}
        <StatusModal
          data={modalActiveTab}
          setBookTripModalVisible={setBookTripModalVisible}
          setModalVisible={setModalVisible}
          setViewTripModalVisible={setViewTripModalVisible}
          modalData={modalData}
          // setConfirmationTripModalVisible={setConfirmationTripModalVisible}
        />
      </Modal>

      <Modal transparent visible={bookTripModalVisible} animationType="slide">
        <Pressable
          style={styles.absolute}
          onPress={() => {
            setBookTripModalVisible(prev => !prev);
          }}>
          <BlurView
            style={styles.absolute}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          />
        </Pressable>
        <BookTripModal data={bookTripModalData} />
      </Modal>

      <Modal transparent visible={viewTripModalVisible} animationType="slide">
        <Pressable
          style={[styles.absolute, {paddingBottom: '10%'}]}
          onPress={() => {
            setViewTripModalVisible(prev => !prev);
          }}>
          <BlurView
            style={styles.absolute}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          />
        </Pressable>
        <Pressable
          style={{paddingTop: '25%'}}
          onPress={() => {
            setViewTripModalVisible(prev => !prev);
          }}>
          <OrderCard data={bookTripModalData} />
        </Pressable>
      </Modal>
    </View>
  );
};

export default HomeScreenHero;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  profile: {
    width: 50,
    backgroundColor: 'white',
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '15%',
    flexDirection: 'row',
    paddingHorizontal: '3%',
    paddingTop: '17%',
    paddingRight: '3%',
  },
  topMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    top: -15,
    backgroundColor: 'white',
    paddingTop: '5%',
    height: '14%',
    paddingHorizontal: '5%',
  },
  menuBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    height: '100%',
    borderRadius: 25,
    backgroundColor: '#fff',

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    alignSelf: 'center',
  },
  menutext: {
    // marginTop: Platform.OS === 'android' ? '10%' : '15%',
    color: 'black',
    fontFamily: CairoSemiBold,
    lineHeight: 20,
  },
  horizonatalLine: {
    width: '95%',
    borderBottomWidth: 0.3,
    borderColor: 'gray',
    alignSelf: 'center',
    top: '-2%',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    alignItems: 'center',
  },
  sectionTitle: {fontSize: 20, fontFamily: CairoRegular, color: 'black'},
  showallContainer: {
    borderWidth: 0.7,
    borderColor: 'red',
    paddingHorizontal: '3%',
    borderRadius: 10,
    width: '20%',
    alignItems: 'center',
  },
  showAll: {fontFamily: CairoRegular, fontSize: 10, color: 'black'},

  card: {
    width: cardWidth,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#F8D7DA',
    borderRadius: 10,
    marginHorizontal: 5,
    padding: 10,
    alignItems: 'center',
    // height: '70%',
    marginTop: '5%',
  },
  badge: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 20,
    padding: '3%',
    paddingHorizontal: '5%',
    left: '30%',
    top: '2%',
    backgroundColor: '#F6F8A9',
    width: '40%',
  },
  badgeText: {fontSize: 10, fontFamily: CairoRegular, color: 'black'},
  tripId: {
    fontSize: 15,
    fontFamily: CairoSemiBold,
    marginTop: 5,
    color: 'black',
  },
  date: {fontSize: 10, color: '#888', marginBottom: 10},
  locations: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    width: '100%',
    justifyContent: 'center',
    height: '2%',
  },
  dot: {width: 6, height: 6, backgroundColor: 'red', borderRadius: 3},
  line: {
    width: '60%',
    height: 1,
    marginHorizontal: 5,
    borderWidth: 0.5,
    borderStyle: 'dashed',
  },
  locationText: {
    fontSize: 11,
    fontWeight: '500',
    marginHorizontal: 3,
    color: 'black',
  },
  bottomBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: '4%',
    height: '33%',
  },
  infoBox: {
    alignItems: 'center',
    borderWidth: 0.5,
    padding: '5%',
    paddingVertical: '5%',
    borderColor: 'gray',
    borderRadius: 10,
    width: '48%',
  },
  label: {fontSize: 8, color: '#888', marginTop: '15%'},
  value: {fontSize: 10, fontWeight: 'bold', marginTop: '5%', color: 'black'},
  lineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  absolute: {
    ...StyleSheet.absoluteFillObject,
  },
});
