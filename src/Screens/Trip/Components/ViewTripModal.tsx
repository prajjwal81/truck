import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import Received from '../../../../assets/Images/Svg/Received.svg';
import Map from '../../../../assets/Images/Svg/Map.svg';
import Parcel from '../../../../assets/Images/Svg/Parcel.svg';
import Shipped from '../../../../assets/Images/Svg/Shipped.svg';
import Driver from '../../../../assets/Images/Svg/Driver2.svg';
import I18n from '../../../i18n';

const OrderCard = ({data}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Status & Title */}
      <View style={styles.headerRow}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{data?.status}</Text>
          </View>
          <Text style={styles.orderId}>{data?.tripId}</Text>
        </View>
        <Text style={styles.menuIcon}>⋮</Text>
      </View>

      <View style={styles.cardWrapper}>
        {/* Icon badge */}

        <View style={styles.card}>
          <View style={styles.sectionRow}>
            <View style={[styles.iconBadge, {left: '17%'}]}>
              <Received />
            </View>

            <View style={styles.cardContainer}>
              <Text style={styles.sectionTitle}>{I18n.t('order')}</Text>
              <View style={styles.line} />
              <View style={[styles.section, {flexDirection: 'row'}]}>
                <View>
                  <Text style={styles.label}>{I18n.t('truck')}</Text>
                  <Text style={styles.value}>{data?.truck}</Text>
                  <Text style={[styles.label, {marginTop: 20}]}>
                    {I18n.t('weight')}
                  </Text>
                  <Text style={styles.value}>{data?.weight}</Text>
                </View>
                <View>
                  <Text style={styles.label}>{I18n.t('shipment')}</Text>
                  <Text style={styles.value}>{data?.product}</Text>
                  <Text style={[styles.label, {marginTop: 20}]}>
                    {I18n.t('price')}
                  </Text>
                  <Text style={styles.value}>{data?.price}</Text>
                </View>
              </View>
            </View>

            <View style={[styles.iconBadge, {left: '70%'}]}>
              <Map />
            </View>
            <View style={styles.cardContainer}>
              <Text style={styles.sectionTitle}>{I18n.t('location')}</Text>
              <View style={styles.line} />
              <View style={[styles.section, {flexDirection: 'row'}]}>
                <View>
                  <Text style={styles.label}>{I18n.t('loading')}</Text>
                  <Text style={styles.link}>{data?.pickUpCity}</Text>
                  <Text style={[styles.label, {marginTop: 20}]}>Trip Time</Text>
                  <Text style={styles.value}>5:23PM</Text>
                </View>
                <View>
                  <Text style={[styles.label, {top: -2}]}>
                    {I18n.t('unloading')}
                  </Text>
                  <Text style={[styles.link, {top: -2}]}>
                    {data?.dropOffCity}
                  </Text>
                  <Text style={[styles.label, {marginTop: 20}]}>Trip Date</Text>
                  <Text style={[styles.value, {fontSize: 11}]}>
                    {data?.date}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Recipient */}
          <View style={styles.iconWithSection}>
            <View style={[styles.iconBadgeSmall, {}]}>
              <Parcel />
            </View>
            <Text style={styles.sectionTitle}>Recipient</Text>
            <View style={[styles.line, {width: '60%', marginBottom: 0}]} />
            <View style={styles.centerSection}>
              <View style={styles.centerSectionContainer}>
                <Text style={styles.label}>{I18n.t('phoneNumber')}</Text>
                <Text style={styles.value}>{data?.receiver?.phoneNumber}</Text>
              </View>
              <View style={[styles.centerSectionContainer, {left: '25%'}]}>
                <Text style={styles.label}>{I18n.t('name')}</Text>
                <Text style={styles.value}>{data?.receiver?.text}</Text>
              </View>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Shipper & Driver */}
          <View style={styles.sectionRow}>
            <View style={[styles.iconBadge, {left: '17%'}]}>
              <Shipped />
            </View>
            <View style={styles.cardContainer}>
              <Text style={styles.sectionTitle}>{I18n.t('shipper')}</Text>
              <View style={styles.line} />
              <View style={[styles.section, {flexDirection: 'row'}]}>
                <View>
                  <Text style={styles.label}>{I18n.t('name')}</Text>
                  <Text style={styles.value}>{data?.carrier?.companyName}</Text>
                </View>
                <View>
                  <Text style={styles.label}>{I18n.t('address')}</Text>
                  <Text style={styles.value}>
                    {data?.carrier?.emailAddress}
                  </Text>
                </View>
              </View>
              <Text style={styles.label}>{I18n.t('phoneNumber')}</Text>
              <Text style={styles.value}>{data?.carrier?.phoneNumber}</Text>
            </View>

            <View style={[styles.iconBadge, {left: '70%'}]}>
              <Driver />
            </View>
            <View style={styles.cardContainer}>
              <Text style={styles.sectionTitle}>{I18n.t('driver')}</Text>
              <View style={styles.line} />
              <View
                style={[
                  styles.section,
                  {
                    flexDirection: 'row',
                    marginHorizontal: 0,
                  },
                ]}>
                <View>
                  <Text style={styles.label}>{I18n.t('name')}</Text>
                  <Text style={styles.value}>{data?.driver?.name}</Text>
                  <Text style={[styles.label, {marginTop: 20}]}>Phone No.</Text>
                  <Text style={styles.value}>{data?.driver?.phoneNumber}</Text>
                </View>
                <View>
                  <Text style={styles.label}>{I18n.t('idNumber')}</Text>
                  <Text style={styles.value}>
                    {data?.driver?.identityNumber}
                  </Text>
                  <Text style={[styles.label, {marginTop: 20}]}>
                    Truck Plate
                  </Text>
                  <Text style={styles.value}>{data?.driver?.plateNumber}</Text>
                </View>
              </View>
            </View>
          </View>

          <Pressable style={styles.pdf}>
            <Text>Export PDF</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    // backgroundColor: '#fff',
    // paddingTop: '40%',
    // height: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EDEDED',
    paddingVertical: '6%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  statusBadge: {
    backgroundColor: '#f9f8bb',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginLeft: '15%',
  },
  statusText: {color: '#000', fontWeight: '600'},
  orderId: {
    color: '#2a6fd6',
    fontWeight: '600',
    textDecorationLine: 'underline',
    marginLeft: '10%',
    marginTop: '2.5%',
  },
  menuIcon: {fontSize: 22, fontWeight: 'bold', marginRight: '5%'},

  cardWrapper: {
    position: 'relative',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  iconBadge: {
    position: 'absolute',
    top: -20,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    zIndex: 10,
  },
  iconImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  section: {
    marginHorizontal: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    // flexDirection: 'row',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  sectionContainer: {
    flexDirection: 'row',
  },
  label: {
    color: '#888',
    fontSize: 12,
    marginVertical: '10%',
    textAlign: 'center',
  },
  value: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  link: {
    color: '#2a6fd6',
    textDecorationLine: 'underline',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  centerSection: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconWithSection: {
    alignItems: 'center',
    marginTop: 24,
    width: '80%',
    alignSelf: 'center',
    borderWidth: 0.7,
    borderRadius: 10,
  },
  iconBadgeSmall: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 4,
    alignSelf: 'center',
    top: '-12%',
  },
  iconImageSmall: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 16,
  },
  cardContainer: {
    borderWidth: 0.5,
    width: '48%',
    padding: '2%',
    borderRadius: 10,
    paddingTop: '5%',
    borderColor: 'gray',
  },
  line: {
    borderBottomWidth: 0.3,
    borderColor: 'gray',
    width: '95%',
    alignSelf: 'center',
    marginVertical: '5%',
  },
  centerSectionContainer: {
    width: '48%',
    top: '-2%',
  },
  pdf: {
    borderWidth: 0.5,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5%',
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: '5%',
  },
});

export default OrderCard;
