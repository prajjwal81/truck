import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Alert,
  I18nManager,
} from 'react-native';
import {CairoBold, CairoSemiBold} from '../../../utils/fonts';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import I18n from '../../../i18n';
import RNRestart from 'react-native-restart';
import {setItem} from '../../../utils/asyncStorage';

const LanguageSelector = () => {
  const navigation = useNavigation();
  const [locale, setLocale] = useState(I18n.locale); // to force re-render

  const confirmLanguageChange = lang => {
    const langName = lang === 'ar' ? 'Arabic' : 'English';
    const isRTL = lang === 'ar';

    // Agar language same hai to kuch bhi mat karo
    if (I18n.locale === lang) {
      return Alert.alert('Already Selected', `App is already in ${langName}.`);
    }

    Alert.alert('Change Language', `Do you want to switch to ${langName}?`, [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'OK',
        onPress: async () => {
          await setItem('APP_LANGUAGE', lang);

          // Update I18n
          I18n.locale = lang;

          // Apply RTL if needed
          if (I18nManager.isRTL !== isRTL) {
            await I18nManager.forceRTL(isRTL);
            RNRestart.Restart(); // Needed for direction change
          } else {
            RNRestart.Restart(); // Needed to reflect language change
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: '10%',
        }}>
        <Pressable
          style={styles.iconContainer}
          onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back-ios"
            size={20}
            color="gray"
            style={{left: '25%'}}
          />
        </Pressable>
        <Text style={styles.title}>{I18n.t('selectLanguage')}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => confirmLanguageChange('en')}>
        <Text style={styles.buttonText}>English</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => confirmLanguageChange('ar')}>
        <Text style={styles.buttonText}>Arabic</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    alignItems: 'center',
    flex: 1,
    paddingTop: '15%',
  },
  iconContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    alignContent: 'center',
    padding: '2%',
    right: '210%',
  },
  title: {
    fontSize: 20,
    fontFamily: CairoBold,
  },
  button: {
    borderRadius: 10,
    paddingVertical: '4%',
    paddingHorizontal: '10%',
    marginVertical: '2%',
    width: '100%',
    alignItems: 'center',
    borderWidth: 0.5,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontFamily: CairoSemiBold,
  },
});

export default LanguageSelector;
