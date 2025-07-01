import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {CairoBold, CairoSemiBold} from '../../../utils/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import I18n from '../../../i18n';
import {getItem} from '../../../utils/asyncStorage';
import {apiCall2} from '../../../API/CustomHook';
import {endpoint} from '../../../API/Endpoint';

const ReportsScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  useEffect(() => {
    const fucnCall = async () => {
      try {
        const auth = await getItem('auth');
        console.log('📦 Token from AsyncStorage:', auth);

        const response = await apiCall2({
          method: 'GET',
          endpoint: endpoint.Invoice + '/' + 0,
          token: auth,
        });

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
          method: 'GET',
          endpoint: endpoint.Revanue,
          token: auth,
        });
        console.log('dfasdf', response);
        setData2(response.payload.payload);
      } catch (error) {
        console.error('❌ Error in API call:', error);
      }
    };

    fucnCall();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {/* Back Arrow & Title */}
      <View style={styles.header}>
        <AntDesign
          name="leftcircleo"
          size={34}
          color="black"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.headerTitle}>{I18n.t('reports')}</Text>
      </View>

      {/* Revenue Circles */}
      <View style={styles.circleRow}>
        <View style={styles.circleContainer}>
          <Text style={styles.circleTitle}>{I18n.t('total_revenue')}</Text>
          <Text style={styles.circleAmount}>{data2?.totalRevenue} SR</Text>
        </View>
        <View style={styles.circleContainer}>
          <Text style={styles.circleTitle}>
            {I18n.t('outstanding_payment')}
          </Text>
          <Text style={styles.circleAmount}>{data2?.unPaidAmount} SR</Text>
        </View>
      </View>

      {/* Invoice Section */}
      <Text style={styles.invoiceTitle}>{I18n.t('invoices')}</Text>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>{I18n.t('invoice_number')}</Text>
        <Text style={styles.tableHeaderText}>{I18n.t('invoice_date')}</Text>
        <Text style={styles.tableHeaderText}>{I18n.t('payment_date')}</Text>
        <Text style={styles.tableHeaderText}>{I18n.t('amount')}</Text>
        <Text style={styles.tableHeaderText}>{I18n.t('status')}</Text>
      </View>

      {/* Invoice Rows */}
      <ScrollView>
        {data.map((item, index) => (
          <View key={index} style={styles.invoiceRow}>
            <Text style={styles.invoiceLink}>{item?.reference}</Text>
            <Text style={styles.dateText}>{item?.invoiceDate}</Text>
            <Text style={styles.dateText}>{item?.paymentDate}</Text>
            <Text style={styles.amountText}>{item?.amount}</Text>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor:
                    item.status === 'Paid'
                      ? '#8ED99E'
                      : item.status === 'Not Paid' || item.status === 'Unpaid'
                      ? '#D9D9D9'
                      : item.status === 'Partially Paid'
                      ? '#F6F8A9'
                      : item.status === 'Overdue'
                      ? '#FF3E3A'
                      : '#D9D9D9',
                },
              ]}>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: '5%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingLeft: '2%',
  },
  backArrow: {
    fontSize: 24,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 22,
    marginLeft: '5%',
    color: 'black',
    fontFamily: CairoBold,
  },
  circleRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  circleContainer: {
    borderWidth: 1,
    borderColor: '#9DE6B0',
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
  },
  circleTitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
  },
  circleAmount: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  invoiceTitle: {
    fontSize: 16,
    marginBottom: 10,
    left: '2.5%',
    color: 'black',
    fontFamily: CairoBold,
  },
  tableHeader: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#F9F9F9',
    marginBottom: 10,
    width: '95%',
    alignSelf: 'center',
  },
  tableHeaderText: {
    width: '14%',
    fontSize: 12,
    fontFamily: CairoSemiBold,
    color: 'black',
  },
  invoiceRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingHorizontal: '1%',
    width: '95%',
    alignSelf: 'center',
  },
  statusBadge: {
    // paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 10,
    fontFamily: CairoSemiBold,
    textAlign: 'center',
  },
  invoiceLink: {
    width: '19%',
    color: '#0046C0',
    textDecorationLine: 'underline',
    fontSize: 10,
  },
  dateText: {
    width: '20%',
    fontSize: 12,
  },
  amountText: {
    width: '14%',
    fontSize: 10,
    fontFamily: CairoBold,
    textAlign: 'center',
  },
});

export default ReportsScreen;
