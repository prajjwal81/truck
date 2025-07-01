import React from 'react';
import {View, Text, TextInput, StyleSheet, TextInputProps} from 'react-native';

interface CustomTextInputProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  half?: boolean;
  multiline?: boolean;
  placeholder?: string;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  half = false,
  multiline = false,
  placeholder = '',
  ...props
}) => {
  return (
    <View style={[styles.inputMainContainer, {width: half ? '48%' : '100%'}]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.inputNew,
          multiline && {minHeight: 100}, // increase height if multiline
        ]}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        {...props}
        placeholder={placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputMainContainer: {
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderWidth: 0.5,
    borderColor: 'gray',
  },
  label: {
    position: 'absolute',
    top: -8,
    left: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 4,
    fontSize: 12,
    color: '#A1A1A1',
    zIndex: 1,
  },
  inputNew: {
    fontSize: 16,
    color: '#000',
    textAlignVertical: 'center',
    minHeight: 50,
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default CustomTextInput;
