import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import I18n from '../../../i18n';
import {CairoRegular, CairoSemiBold} from '../../../utils/fonts';
import {getItem} from '../../../utils/asyncStorage';
import {apiCall2} from '../../../API/CustomHook';
import {endpoint} from '../../../API/Endpoint';

const PasswordResetScreen = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rules, setRules] = useState({
    beginWithLetter: false,
    hasUpperAndLower: false,
    hasSpecialChar: false,
    hasFourNumbers: false,
    isMin8Char: false,
  });

  const onNewPasswordChange = text => {
    setNewPassword(text);
    setRules(validatePasswordRules(text));
  };

  const validatePasswordRules = password => {
    return {
      beginWithLetter: /^[A-Za-z]/.test(password),
      hasUpperAndLower: /(?=.*[a-z])(?=.*[A-Z])/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasFourNumbers: (password.match(/\d/g) || []).length >= 4,
      isMin8Char: password.length >= 8,
    };
  };

  const Handler = async () => {
    const auth = await getItem('auth');

    const res = await apiCall2({
      method: 'POST',
      endpoint: endpoint.changePassword,
      token: auth,
      params: {
        userType: 0,
        languageCode: 0,
        oldPassword: currentPassword,
        newPassword: newPassword,
        userId: 0,
      },
    });
    console.log(res);
  };
  return (
    <View style={{flex: 1, paddingTop: '15%'}}>
      <Image
        source={require('../../../../assets/Images/Png/logoA.png')}
        style={{alignSelf: 'flex-end', right: '5%', width: 50, height: 50}}
      />
      <View style={styles.container}>
        <Text style={styles.title}>{I18n.t('password_reset')}</Text>
        <Text style={styles.subtitle}>{I18n.t('enter_new_password')}</Text>

        <Text style={styles.label}>{I18n.t('current_password')}</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />

        <Text style={styles.label}>{I18n.t('new_password')}</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={newPassword}
          onChangeText={onNewPasswordChange}
        />
        <View style={{marginTop: 10}}>
          <Text style={{color: rules.beginWithLetter ? 'green' : '#888'}}>
            {I18n.t('password_begin_with_letter')}
          </Text>
          <Text style={{color: rules.hasUpperAndLower ? 'green' : '#888'}}>
            {I18n.t('password_upper_lower')}
          </Text>
          <Text style={{color: rules.hasSpecialChar ? 'green' : '#888'}}>
            {I18n.t('password_special_char')}
          </Text>
          <Text style={{color: rules.hasFourNumbers ? 'green' : '#888'}}>
            {I18n.t('password_four_numbers')}
          </Text>
          <Text style={{color: rules.isMin8Char ? 'green' : '#888'}}>
            {I18n.t('password_min_length')}
          </Text>
        </View>

        <Text style={styles.label}>{I18n.t('confirm_password')}</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.button} onPress={Handler}>
          <Text style={styles.buttonText}>{I18n.t('confirm')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PasswordResetScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 50,
    fontFamily: CairoSemiBold,
  },
  subtitle: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: CairoRegular,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    marginTop: 16,
    fontFamily: CairoRegular,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
  },
  strengthBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 5,
  },
  bar: {
    height: 4,
    width: 40,
    borderRadius: 2,
  },
  goodText: {
    marginLeft: 10,
    fontSize: 12,
    color: '#666',
  },
  button: {
    backgroundColor: '#e32224',
    padding: 16,
    borderRadius: 50,
    marginTop: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
