import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  ScrollView,
  Modal,
  Dimensions,
  Platform,
  ToastAndroid,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Truck from '../../../assets/Images/Svg/Truck2.svg';
import {CairoBold, CairoRegular, CairoSemiBold} from '../../utils/fonts';
import {BlurView} from '@react-native-community/blur';
import StatusModal from './Components/StatusModal';
import BookTripModal from './Components/BooktripModalScreen';
import ViewTripModal from './Components/ViewTripModal';
import {useRoute} from '@react-navigation/native';
import {getItem} from '../../utils/asyncStorage';
import {apiCall2} from '../../API/CustomHook';
import {endpoint} from '../../API/Endpoint';
import I18n from '../../i18n';
import ConfirmationModal from './Components/ConfirmationModal';
import Clipboard from '@react-native-clipboard/clipboard';

const {height, width} = Dimensions.get('window');
const tabs = ['all', 'pending', 'ongoing', 'booked', 'delivered', 'cancelled'];

const statusColors = {
  pending: '#F6EC75',
  delivered: '#A4DAA4',
  cancelled: '#E35D5D',
  booked: '#F6C07A',
  ongoing: '#BDF3F6',
};

const Trip = () => {
  const route = useRoute();
  const status = route?.params?.status;
  const updatedStatus = (status || '').toLowerCase();
  const [activeTab, setActiveTab] = useState(
    !updatedStatus ? 'all' : updatedStatus,
  );
  const [modalActiveTab, setModalActiveTab] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const [bookTripModalVisible, setBookTripModalVisible] = useState(false);
  const [bookTripModalData, setBookTripModalData] = useState();
  const [viewTripModalVisible, setViewTripModalVisible] = useState(false);
  const [confirmationModalVisible, setConfirmationTripModalVisible] =
    useState(false);
  const [data, setData] = useState();
  const [CancelTrip, setCancelTrip] = useState(false);

  useEffect(() => {
    const fucnCall = async () => {
      try {
        let statusNum =
          activeTab === 'All'
            ? 0
            : activeTab === 'pending'
            ? 1
            : activeTab === 'booked'
            ? 2
            : activeTab === 'ongoing'
            ? 5
            : activeTab === 'delivered'
            ? 6
            : activeTab === 'cancelled'
            ? 7
            : 1;
        const auth = await getItem('auth');

        const response = await apiCall2({
          method: 'POST',
          endpoint: endpoint.GetCarrierTrips,
          //  have to chanvge the API with GetCarrrierTrips
          token: auth,
          params: {
            status: statusNum,
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
          JSON.stringify(response.payload.payload, null, 2),
        );
        setData(response.payload.payload);
      } catch (error) {
        console.error('❌ Error in API call:', error);
      }
    };

    fucnCall();
  }, [activeTab]);

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

  const getMonthShortName = monthNumber => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const index = monthNumber - 1;

    if (index >= 0 && index < 12) {
      return months[index];
    } else {
      return '';
    }
  };

  const renderTab = tab => {
    return (
      <Pressable
        key={tab}
        style={[styles.tabItem, activeTab === tab && styles.activeTabItem]}
        onPress={() => setActiveTab(tab)}>
        <Text
          style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
          {I18n.t(tab)}
        </Text>
      </Pressable>
    );
  };

  const closeModal = () => {
    setModalVisible(prev => !prev);
  };
  const formattedTab =
    activeTab.charAt(0).toUpperCase() + activeTab.slice(1).toLowerCase();

  const TripCard = ({item}) => {
    const bgColor =
      statusColors[
        activeTab == 'all' ? item.status.toLowerCase() : activeTab
      ] || '#eee';

    const handleCopy = () => {
      Clipboard.setString(item.tripNumber);
      if (Platform.OS === 'android') {
        ToastAndroid.show('Copied to clipboard!', ToastAndroid.SHORT);
      } else {
        Alert.alert('Copied to clipboard!');
      }
    };

    return (
      <Pressable style={styles.card}>
        <View style={{flexDirection: 'row'}}>
          <View style={[styles.statusLabel, {backgroundColor: bgColor}]}>
            <Text style={styles.statusText}>
              {activeTab == 'all' ? item.status : formattedTab}
            </Text>
          </View>
          <Text style={styles.tripId}>{item?.tripNumber}</Text>
          {item?.tripNumber != '' && (
            <Icon
              name="copy-outline"
              size={16}
              color="#0028A5"
              style={{marginTop: '1.5%', marginLeft: '2%'}}
              onPress={handleCopy}
            />
          )}
        </View>

        <Pressable
          style={styles.cardBody}
          onPress={() => {
            setModalVisible(true);
            setModalActiveTab(activeTab == 'all' ? item.status : activeTab);
            cardDetailHandler(item.tripId);
            setModalData(item);
          }}>
          <View style={styles.dateBox}>
            <Text style={styles.dateText}>{item?.date?.split('/')[0]}</Text>
            <Text style={styles.monthText}>
              {getMonthShortName(item?.date?.split('/')[1])}
            </Text>
          </View>

          <View style={{flex: 1}}>
            <Text style={styles.routeText}>
              {item?.pickUpCity?.split(' ')[0]} {item.dropOffCity && 'To'}{' '}
              {item?.dropOffCity}
            </Text>
            <Text style={styles.companyText}>{item?.dropOffCity}</Text>
          </View>

          <View style={styles.rightSection}>
            <View style={styles.amountBox}>
              <Text style={styles.amountText}>{item?.price} SR</Text>
            </View>
          </View>
        </Pressable>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', gap: 6}}>
        <Truck style={{marginTop: Platform.OS == 'ios' ? '2.5%' : '1%'}} />
        <Text style={styles.title}>{I18n.t('trips')}</Text>
      </View>
      <View style={styles.line} />
      <View style={styles.tabsWrapper}>
        <ScrollView horizontal style={styles.tabs} indicatorStyle="white">
          {tabs.map(renderTab)}
        </ScrollView>
      </View>

      <FlatList
        data={data}
        keyExtractor={item => item?.tripId}
        renderItem={({item}) => <TripCard item={item} />}
        contentContainerStyle={{paddingBottom: 20}}
      />

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
          setConfirmationTripModalVisible={setConfirmationTripModalVisible}
          setCancelTrip={setCancelTrip}
          modalData={modalData}
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
        <BookTripModal
          data={bookTripModalData}
          setBookTripModalVisible={setBookTripModalVisible}
        />
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
          <ViewTripModal data={bookTripModalData} />
        </Pressable>
      </Modal>

      <Modal
        transparent
        visible={confirmationModalVisible}
        animationType="slide">
        <Pressable
          style={[styles.absolute, {paddingBottom: '10%'}]}
          onPress={() => {
            setConfirmationTripModalVisible(prev => !prev);
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
            setConfirmationTripModalVisible(prev => !prev);
          }}>
          <ConfirmationModal
            data={bookTripModalData}
            setConfirmationTripModalVisible={setConfirmationTripModalVisible}
            cancel={CancelTrip}
          />
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: Platform.OS == 'ios' ? '15%' : 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontFamily: CairoSemiBold,
    marginBottom: 10,
  },
  tabsWrapper: {
    marginBottom: 15,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: '2%',
    paddingTop: '8%',
  },
  tabItem: {
    paddingHorizontal: 6,
    paddingVertical: 6,
    marginRight: 8,
    borderRadius: 20,
    borderBottomWidth: 2,
    borderColor: 'transparent',
  },
  activeTabItem: {
    borderColor: 'red',
  },
  tabText: {fontSize: 16, color: '#444', top: '-60%'},
  activeTabText: {fontWeight: 'bold', color: '#000'},

  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    width: '95%',
    alignSelf: 'center',
    height: height / 9,
  },
  statusLabel: {
    // paddingVertical: 5,
    paddingHorizontal: '1%',
    alignSelf: 'flex-start',
    borderBottomRightRadius: 12,
    width: '20%',
  },
  statusText: {
    color: '#000',
    fontSize: 12,
    fontFamily: CairoSemiBold,
    alignSelf: 'center',
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 12,
    paddingVertical: 5,
  },
  dateBox: {
    width: '18%',
    height: '95%',
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.3,
    borderColor: 'black',
  },
  dateText: {fontWeight: 'bold', fontSize: 16},
  monthText: {fontSize: 12, color: '#555'},
  routeText: {
    fontSize: 15,
    left: '15%',
    fontFamily: CairoBold,
  },
  companyText: {
    color: '#777',
    fontFamily: CairoSemiBold,
    left: '15%',
    top: '-5%',
  },
  rightSection: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '20%',
    backgroundColor: '#eee',
    height: '80%',
    borderRadius: 15,
  },
  tripId: {color: '#0028A5', marginLeft: '3%', marginTop: '2%', fontSize: 10},
  amountBox: {
    backgroundColor: '#eee',
  },
  amountText: {color: '#32C671', fontFamily: CairoBold, marginRight: '15%'},
  line: {
    borderBottomWidth: 0.8,
    borderColor: 'gray',
    width: '95%',
    alignSelf: 'center',
    marginBottom: '5%',
  },
  absolute: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Trip;
