import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import I18n from '../../../i18n';
import {CairoBold, CairoSemiBold} from '../../../utils/fonts';
import {endpoint} from '../../../API/Endpoint';
import {apiCall2} from '../../../API/CustomHook';
import {getItem} from '../../../utils/asyncStorage';

const WalletWithdrawScreen = () => {
  const route = useRoute();
  const balance = route?.params?.wallet?.walletBalance;
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: '',
    bankName: '',
    accountNumber: '',
    iban: '',
    customAmount: '',
  });

  const [selectedOption, setSelectedOption] = useState('full');

  const handleChange = (key, value) => {
    setFormData(prev => ({...prev, [key]: value}));
  };
  const today = new Date();
  const formattedDate = `${today.getFullYear()}/${String(
    today.getMonth() + 1,
  ).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}`;

  console.log(formattedDate); // Example: "2025/06/15"

  const submitHandler = async () => {
    const auth = await getItem('auth');
    const res = await apiCall2({
      method: 'POST',
      endpoint: endpoint.withdraw,
      token: auth,
      params: {
        vatNumber: '',
        vendor: '',
        date: formattedDate,
        amount: balance,
        accountNumber: formData?.accountNumber,
        bank: formData?.bankName,
        accountHolderName: formData?.name,
        iban: formData?.iban,
      },
    });
    console.log(res.payload.payload.result);
  };

  return (
    <View style={styles.container}>
      {/* Wallet Info */}
      <View style={styles.walletInfo}>
        <TouchableOpacity style={styles.backButton}>
          <AntDesign
            name="leftcircleo"
            size={34}
            color="black"
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
        <Text style={styles.walletEmoji}>💰</Text>
        <Text style={styles.walletTitle}>{I18n.t('wallet_balance')}</Text>
        <Text style={styles.walletAmount}>9000 SR</Text>
      </View>

      <View style={styles.divider} />

      {/* Title */}
      <Text style={styles.sectionTitle}>{I18n.t('request_withdraw')}</Text>

      {/* Form Inputs */}
      <TextInput
        style={styles.input}
        placeholder={I18n.t('name')}
        value={formData.name}
        onChangeText={text => handleChange('name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder={I18n.t('bank_name')}
        value={formData.bankName}
        onChangeText={text => handleChange('bankName', text)}
      />
      <TextInput
        style={styles.input}
        placeholder={I18n.t('account_number')}
        keyboardType="numeric"
        value={formData.accountNumber}
        onChangeText={text => handleChange('accountNumber', text)}
      />
      <TextInput
        style={styles.input}
        placeholder={I18n.t('iban')}
        value={formData.iban}
        onChangeText={text => handleChange('iban', text)}
      />

      {/* Radio Buttons */}
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => setSelectedOption('full')}>
          <View style={styles.radioCircle}>
            {selectedOption === 'full' && <View style={styles.selectedDot} />}
          </View>
          <Text style={styles.radioLabel}>{I18n.t('withdraw_full')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => setSelectedOption('custom')}>
          <View style={styles.radioCircle}>
            {selectedOption === 'custom' && <View style={styles.selectedDot} />}
          </View>
          <Text style={styles.radioLabel}>{I18n.t('set_amount')}</Text>
        </TouchableOpacity>
      </View>

      {/* Show custom amount input only if 'custom' option is selected */}
      {selectedOption === 'custom' && (
        <TextInput
          style={styles.input}
          placeholder={I18n.t('enter_amount')}
          keyboardType="numeric"
          value={formData.customAmount}
          onChangeText={text => handleChange('customAmount', text)}
        />
      )}

      {/* Withdraw Button */}
      <TouchableOpacity
        style={styles.withdrawButton}
        onPress={() => {
          submitHandler();
        }}>
        <Text style={styles.withdrawButtonText}>
          {I18n.t('withdraw_balance')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
    marginTop: Platform.OS == 'ios' ? '10%' : 0,
  },
  backButton: {
    position: 'absolute',
    right: '90%',
  },
  walletInfo: {
    alignItems: 'center',
    marginTop: 10,
  },
  walletEmoji: {
    fontSize: 30,
  },
  walletTitle: {
    fontSize: 16,
    fontFamily: CairoBold,
    marginTop: 4,
    color: 'black',
  },
  walletAmount: {
    fontSize: 32,
    fontFamily: CairoBold,
    marginTop: 8,
    color: 'black',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 15,
    fontFamily: CairoBold,
    textAlign: 'center',
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
    fontSize: 14,
    color: '#333',
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    height: 18,
    width: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
  radioLabel: {
    fontSize: 14,
  },
  withdrawButton: {
    backgroundColor: 'red',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  withdrawButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default WalletWithdrawScreen;
