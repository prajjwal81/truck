import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import PrimaryButton from '../Common/Button';
import {CairoSemiBold} from '../../utils/fonts';
import {useNavigation} from '@react-navigation/native';
import I18n from '../../i18n';

const {width, height} = Dimensions.get('window');

const SplashScreen2 = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  return (
    <View>
      <FastImage
        source={require('../../../assets/Images/Jpeg/splash2.jpg')} // ← local image
        style={{width: width / 1.1 + 35, height: height / 1.6}}
        resizeMode={'cover'}
      />
      <FastImage
        source={require('../../../assets/Images/Png/logo22.png')}
        style={{
          width: width / 2,
          height: height / 15,
          position: 'absolute',
          top: '6%',
          alignSelf: 'center',
        }}
        resizeMode={''}
      />

      <View style={styles.container}>
        <Text style={styles.text}>{I18n.t('findLoads')}</Text>
        <Text style={{marginTop: '2%'}}>{I18n.t('accessLoads')}</Text>
        <View style={styles.dotContainer}>
          <View style={[styles.dot, {backgroundColor: 'gray'}]} />
          <View style={styles.dot} />
        </View>
        <PrimaryButton
          onPress={() => navigation.navigate('LoginAsScreen')}
          loading={loading}
          title={I18n.t('continue')}
          errorMessage={errorMessage}
          style={{width: width / 1.1, marginTop: '5%'}}
        />

        <PrimaryButton
          onPress={() => navigation.navigate('LoginAsScreen')}
          loading={loading}
          title={I18n.t('skip')}
          errorMessage={errorMessage}
          style={{
            width: width / 1.1,
            backgroundColor: '#DCDBDB',
            marginVertical: '5%',
          }}
        />
      </View>
    </View>
  );
};
export default SplashScreen2;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: CairoSemiBold,
    fontSize: 24,
    marginTop: '5%',
  },
  dotContainer: {
    flexDirection: 'row',
    marginTop: '20%',
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: 'red',
    borderRadius: 100,
    marginRight: 10,
  },
});
