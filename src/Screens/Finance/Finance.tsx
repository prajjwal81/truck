import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Pressable,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CairoBold, CairoRegular, CairoSemiBold} from '../../utils/fonts';
import Accounts from '../../../assets/Images/Svg/Accounts.svg';
import AddButton from '../../../assets/Images/Svg/AddButton.svg';
import Invoice from '../../../assets/Images/Svg/Invoice.svg';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {getItem} from '../../utils/asyncStorage';
import {apiCall2} from '../../API/CustomHook';
import {endpoint} from '../../API/Endpoint';
import {parseDate} from '../../utils/func';
import I18n from '../../i18n';
import Logo from '../../../assets/Images/Svg/sar.svg';

const Finance = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [showAll, setShowAll] = useState(true);
  const [wallet, setWallet] = useState();
  const [history, setHistory] = useState();

  const renderItem = ({item}) => (
    <View style={styles.itemBox}>
      <View style={styles.dateBox}>
        {/* <Text style={styles.dateText}>{parseDate(item.date).day}</Text> */}
        {/* <Text style={styles.monthText}>{parseDate(item.date).month}</Text> */}
        <Text style={styles.monthText}>{item.operationNumber}</Text>
      </View>
      <View style={styles.detailBox}>
        <Text style={styles.desc}>{item?.date}</Text>
        <Text style={[styles.desc, {color: '#000000'}]}>{item?.operation}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.amount}>{item?.amount}</Text>
          <Logo width={15} height={15} />
        </View>
      </View>
      <View
        style={[
          styles.statusContainer,
          {
            backgroundColor:
              item.status == 'Approved'
                ? '#00AC26'
                : item.status == 'To be Approved'
                ? '#F6F8A9'
                : 'red',
          },
        ]}>
        <Text style={styles.debit}>{item?.status}</Text>
      </View>
    </View>
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth = await getItem('auth');
        const response = await apiCall2({
          method: 'GET',
          endpoint: endpoint.Wallet,
          token: auth,
        });
        const response2 = await apiCall2({
          method: 'GET',
          endpoint: endpoint.History,
          token: auth,
        });
        setWallet(response.payload.payload);
        setHistory(response2.payload.payload);
        console.log(JSON.stringify(response2.payload, null, 2));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {!showAll && (
        <AntDesign
          name="leftcircleo"
          size={34}
          color="black"
          onPress={() => setShowAll(prev => !prev)}
        />
      )}
      <Text style={styles.header}>{I18n.t('wallet_balance')}</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          top: -10,
        }}>
        <Text style={styles.balance}>
          {/* {I18n.t('balance', {amount: wallet?.walletBalance})} */}
          {wallet?.walletBalance}
        </Text>
        <Logo />
      </View>

      <TouchableOpacity style={styles.plusBtn}>
        <Icon name="plus" size={24} color="#fff" />
      </TouchableOpacity>
      <View style={styles.line} />
      {showAll && (
        <>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>{I18n.t('late_payment')}</Text>
              <Text style={styles.value}>{wallet?.overDueAmount} SR</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>{I18n.t('unbilled_amounts')}</Text>
              <Text style={styles.value}>{wallet?.unbilledAmount} SR</Text>
            </View>
          </View>

          <View style={styles.actions}>
            <View style={styles.iconBox}>
              <Pressable
                style={styles.iconContainer}
                onPress={() =>
                  navigation.navigate('WalletWithdrawScreen', {wallet: wallet})
                }>
                <AddButton />
              </Pressable>
              <Text style={styles.icontext}>{I18n.t('withdraw_balance')}</Text>
            </View>
            <View style={styles.iconBox}>
              <Pressable
                style={styles.iconContainer}
                onPress={() => navigation.navigate('ReportsScreen')}>
                <Accounts />
              </Pressable>
              <Text style={styles.icontext}>{I18n.t('reports')}</Text>
            </View>
            <Pressable style={styles.iconBox}>
              <Pressable
                style={styles.iconContainer}
                onPress={() => navigation.navigate('AccountStatement')}>
                <Invoice />
              </Pressable>
              <Text style={styles.icontext}>{I18n.t('account_statement')}</Text>
            </Pressable>
          </View>
        </>
      )}

      <View style={styles.walletHeader}>
        <Text style={styles.walletTitle}>{I18n.t('wallet_operation')}</Text>
        <Pressable onPress={() => setShowAll(false)}>
          {showAll && <Text style={styles.showAll}>{I18n.t('show_all')}</Text>}
        </Pressable>
      </View>

      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{paddingBottom: 20}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: Platform.OS == 'ios' ? '10%' : 0,
    paddingBottom: '15%',
  },
  header: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 10,
    fontFamily: CairoSemiBold,
    color: 'black',
  },
  balance: {
    fontSize: 40,
    textAlign: 'center',
    fontFamily: CairoBold,
    color: 'black',
  },
  plusBtn: {
    backgroundColor: '#EC1E27',
    alignSelf: 'center',
    padding: 12,
    borderRadius: 6,
    marginBottom: 20,
  },
  line: {
    borderBottomWidth: 0.3,
    borderColor: 'gray',
    width: '100%',
    alignSelf: 'center',
    marginVertical: '5%',
    marginTop: '-1%',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  column: {alignItems: 'center', paddingHorizontal: '5%'},
  label: {fontFamily: CairoRegular, color: 'black'},
  value: {fontSize: 16, fontFamily: CairoBold, color: 'black'},
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  iconBox: {alignItems: 'center'},
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  walletTitle: {
    fontSize: 18,
    marginTop: '5%',
    fontFamily: CairoSemiBold,
    color: 'black',
  },
  showAll: {
    color: '#000',
    marginTop: '50%',
    fontFamily: CairoSemiBold,
    fontSize: 13,
  },
  itemBox: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#eee',
    borderLeftWidth: 4,
    borderLeftColor: 'green',
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  iconContainer: {
    borderWidth: 0.5,
    borderColor: 'gray',
    padding: '10%',
    borderRadius: 10,
    marginBottom: '5%',
  },
  icontext: {
    fontFamily: CairoSemiBold,
    color: 'black',
  },
  dateBox: {
    alignItems: 'center',
    width: 60,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: 'gray',
    paddingVertical: '5%',
  },
  dateText: {fontFamily: CairoSemiBold, fontSize: 18, color: 'black'},
  monthText: {fontFamily: CairoSemiBold, color: 'black'},
  detailBox: {flex: 1, paddingLeft: 10, alignItems: 'flex-start'},
  amount: {fontFamily: CairoSemiBold, color: '#00AC26'},
  desc: {color: '#999'},
  debit: {color: '#000000', fontFamily: CairoSemiBold},
  statusContainer: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default Finance;
