import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PrimaryButton from '../Common/Button';
import {useNavigation} from '@react-navigation/native';
import I18n from '../../i18n';

const roles = [
  {
    key: 'Carrier',
    title: I18n.t('carrier'),
    description: I18n.t('carrier_description'),
    image: 'https://img.icons8.com/color/48/organization.png',
  },
  {
    key: 'Driver',
    title: I18n.t('driver'),
    description: I18n.t('driver_description'),
    image: 'https://img.icons8.com/color/48/driver.png',
  },
];

const LoginAsScreen = () => {
  const [selectedRole, setSelectedRole] = useState('Carrier');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();

  const RoleOption = ({role}) => (
    <TouchableOpacity
      style={[
        styles.optionCard,
        selectedRole === role.key && styles.selectedCard,
      ]}
      onPress={() => setSelectedRole(role.key)}>
      <View style={styles.cardContent}>
        <Image source={{uri: role.image}} style={styles.optionImage} />
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionTitle}>{role.title}</Text>
          <Text style={styles.optionDescription}>{role.description}</Text>
        </View>
        {selectedRole === role.key && (
          <MaterialIcons
            name="check-circle"
            size={24}
            color="#D7262F"
            style={{
              marginHorizontal: '2%',
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1}}>
      <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
        <LinearGradient
          colors={['#EC1E27', '#F3767B', '#F3767B', '#F3767B', '#FFFFFF']}
          style={styles.container}>
          <StatusBar backgroundColor="#EC1E27" barStyle="light-content" />

          <View style={styles.header}>
            <Image source={require('../../../assets/Images/Png/logo1.png')} />
            <Image source={require('../../../assets/Images/Png/logoA.png')} />
            <Image source={require('../../../assets/Images/Png/logo2.png')} />
          </View>

          <Animatable.View animation="fadeInUpBig" style={styles.footer}>
            <Text style={styles.title}>{I18n.t('login_as')}</Text>
            <Text style={styles.subtitle}>{I18n.t('login_as_subtitle')}</Text>

            <View style={styles.optionsContainer}>
              {roles?.map(role => (
                <RoleOption key={role.key} role={role} />
              ))}
            </View>

            <PrimaryButton
              onPress={() =>
                navigation.navigate('Login', {selectedRole: selectedRole})
              }
              loading={loading}
              title={I18n.t('continue')}
              errorMessage={errorMessage}
              style={{marginVertical: '5%'}}
            />
          </Animatable.View>
        </LinearGradient>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default LoginAsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '25%',
  },
  footer: {
    flex: 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    marginTop: 30,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  subtitle: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
    color: '#888',
    paddingHorizontal: 30,
    lineHeight: 20,
  },
  optionsContainer: {
    marginTop: 30,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#eee',
  },
  selectedCard: {
    borderColor: '#D7262F',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionImage: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  optionDescription: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
});
