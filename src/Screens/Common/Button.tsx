// components/PrimaryButton.js
import React from 'react';
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import {CairoBold} from '../../utils/fonts';

const PrimaryButton = ({onPress, loading, title, errorMessage, style}) => {
  return (
    <View style={styles.button}>
      <TouchableOpacity
        style={[styles.signIn, style]} // ← merging styles
        onPress={onPress}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color={'white'} />
        ) : (
          <Text style={[styles.textSign, {color: '#fff'}]}>{title}</Text>
        )}
      </TouchableOpacity>

      {!!errorMessage && (
        <Text style={{color: 'red', marginTop: '5%'}}>{errorMessage}</Text>
      )}
    </View>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
  },
  signIn: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: '3%',
    alignSelf: 'center',
    backgroundColor: '#EC1E27',
  },
  textSign: {
    fontSize: 18,
    fontFamily: CairoBold,
  },
});
