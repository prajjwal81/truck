import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {CairoBold, CairoSemiBold} from '../../../utils/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {getItem} from '../../../utils/asyncStorage';
import {apiCall2} from '../../../API/CustomHook';
import {endpoint} from '../../../API/Endpoint';
import I18n from '../../../i18n';

const AccountStatement = () => {
  const navigation = useNavigation();
  const [data, setData] = useState();

  useEffect(() => {
    const fucnCall = async () => {
      try {
        const auth = await getItem('auth');
        const response = await apiCall2({
          method: 'GET',
          endpoint: endpoint.Statement,
          token: auth,
        });

        console.log(
          '✅ API response:',
          endpoint.Wallet,
          JSON.stringify(response.payload.payload),
        );
        setData(response.payload.payload);
      } catch (error) {
        console.error('❌ Error in API call:', error);
      }
    };

    fucnCall();
  }, []);
  const renderItem = ({item}) => (
    <View
      style={[
        styles.itemBox,
        {
          borderLeftColor:
            String(item?.balance).split('')[0] === '-' ? 'red' : 'green',
        },
      ]}>
      <View style={styles.dateBox}>
        <Text style={styles.dateText}>{item.date.split('/')[0]}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.monthText}>{item.date.split('/')[1]}/</Text>
          <Text style={styles.monthText}>{item.date.split('/')[2]}</Text>
        </View>
      </View>
      <View style={styles.detailBox}>
        <Text style={styles.amount}>{item?.move}</Text>
        <Text style={styles.desc}>{item?.reference}</Text>
      </View>
      <Text style={styles.debit}>{item?.balance}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: '5%',
        }}>
        <AntDesign
          name="leftcircleo"
          size={34}
          color="black"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.walletTitle}>{I18n.t('account_statement')}</Text>
      </View>
      <FlatList
        data={data?.lines}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{paddingBottom: 20}}
      />
    </View>
  );
};

export default AccountStatement;

const styles = StyleSheet.create({
  container: {padding: 10, paddingTop: '10%'},
  walletTitle: {fontSize: 28, fontFamily: CairoSemiBold, marginLeft: '5%'},
  itemBox: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#eee',
    borderLeftWidth: 4,
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
  },
  dateBox: {
    alignItems: 'center',
    width: 60,
    borderWidth: 0.2,
    borderRadius: 10,
  },
  dateText: {fontFamily: CairoBold, fontSize: 18},
  monthText: {fontFamily: CairoSemiBold, top: '-8%'},
  detailBox: {flex: 1, paddingLeft: 10, alignItems: 'flex-start'},
  amount: {fontWeight: 'bold'},
  desc: {color: '#999'},
  debit: {color: 'red', fontWeight: 'bold'},
});
