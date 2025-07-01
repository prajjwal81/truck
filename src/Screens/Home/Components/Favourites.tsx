import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Linking,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import I18n from '../../../i18n';
import Star from '../../../../assets/Images/Svg/Star.svg';
import {CairoBold, CairoSemiBold} from '../../../utils/fonts';

const shipperData = [
  {id: '1', loading: 'Riyadh, Saudi Arabia', unloading: 'Yanbu, Saudi Arabia'},
  {id: '2', loading: 'Jeddah, Saudi Arabia', unloading: 'Dammam, Saudi Arabia'},
  {id: '3', loading: 'Riyadh, Saudi Arabia', unloading: 'Yanbu, Saudi Arabia'},
  {id: '4', loading: 'Jeddah, Saudi Arabia', unloading: 'Dammam, Saudi Arabia'},
];

const destinationData = [
  {id: '3', loading: 'Dubai, UAE', unloading: 'Abu Dhabi, UAE'},
  {id: '4', loading: 'Muscat, Oman', unloading: 'Salalah, Oman'},
];

const FavoriteScreen = () => {
  const [activeTab, setActiveTab] = useState('shipper');
  const dataToShow = activeTab === 'shipper' ? shipperData : destinationData;

  const renderRow = ({item}) => (
    <View style={styles.row}>
      <Text
        style={[styles.link, {width: '45%'}]}
        onPress={() => Linking.openURL('#')}>
        {item.loading}
      </Text>
      <Text
        style={[styles.link, {width: '45%'}]}
        onPress={() => Linking.openURL('#')}>
        {item.unloading}
      </Text>
      <TouchableOpacity
        style={{
          width: '10%',
          justifyContent: 'center',
          alignItems: 'flex-end',
          paddingRight: '3%',
        }}
        onPress={() => {}}>
        <Icon name="delete" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Star />
        <Text style={[styles.header, {left: '55%'}]}>
          {I18n.t('favourite')}
        </Text>
      </View>

      <View style={styles.line} />
      <View style={styles.card}>
        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'shipper' && styles.activeTab]}
            onPress={() => setActiveTab('shipper')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'shipper' && styles.activeTabText,
              ]}>
              {I18n.t('shipper')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'destination' && styles.activeTab,
            ]}
            onPress={() => setActiveTab('destination')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'destination' && styles.activeTabText,
              ]}>
              {I18n.t('destination')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}> {I18n.t('loading')}</Text>
          <Text style={styles.headerText}> {I18n.t('unloading')}</Text>
          <Text style={styles.headerText}> {I18n.t('action')}</Text>
        </View>

        {/* List */}
        <FlatList
          data={dataToShow}
          keyExtractor={item => item.id}
          renderItem={renderRow}
        />

        {/* Add New Button */}
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ {I18n.t('addNew')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    backgroundColor: 'white',
    paddingTop: '5%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  container2: {
    flexDirection: 'row',
    paddingTop: Platform.OS == 'ios' ? '10%' : 0,
    alignItems: 'center',
    paddingLeft: '5%',
  },
  line: {
    borderBottomWidth: 0.3,
    borderColor: 'gray',
    width: '95%',
    alignSelf: 'center',
    marginVertical: '5%',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    elevation: 5,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.15,
    // shadowRadius: 3.84,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    paddingTop: '3%',
  },
  tab: {
    flex: 1,
    paddingBottom: 10,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: 'red',
    borderRadius: 20,
  },
  tabText: {
    fontSize: 16,
    color: '#888',
    fontFamily: CairoSemiBold,
    letterSpacing: 0.5,
  },
  activeTabText: {
    fontFamily: CairoSemiBold,
    color: 'black',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
    padding: 8,
    width: '100%',
    paddingLeft: '10%',
    marginTop: '5%',
  },
  headerText: {
    fontFamily: CairoBold,
    color: '#555',
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
    marginBottom: 10,
    paddingLeft: '2.5%',
  },
  link: {
    color: '#007bff',
    textDecorationLine: 'underline',
    fontSize: 13,
  },
  addButton: {
    marginTop: 20,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
