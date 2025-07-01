import React from 'react';
import {
  Alert,
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Modal} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import {BlurView} from '@react-native-community/blur';

const {height, width} = Dimensions.get('window');

const FileModal = ({photoModal, setPhotoModal, setReturnVal}) => {
  return (
    <>
      <Modal
        visible={photoModal}
        onDismiss={() => setPhotoModal(false)}
        style={{
          top: -height / 1.4,
        }}>
        <Pressable
          style={[
            styles.fakeHeight,
            {height: Platform.OS === 'android' ? '57%' : '62%'},
          ]}
          onPress={() => setPhotoModal(false)}>
          <BlurView
            style={styles.absolute}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          />
        </Pressable>

        <View style={styles.modalContent}>
          <Pressable style={styles.btnContainer}>
            <Pressable
              style={styles.btn}
              onPress={() => openCamera(setReturnVal)}>
              <Text style={styles.btnText}>Camera</Text>
            </Pressable>
            <Pressable
              style={styles.btn}
              onPress={() => openGallery(setReturnVal)}>
              <Text style={styles.btnText}>Gallery</Text>
            </Pressable>
            <Pressable
              style={styles.btn}
              onPress={() => openFilePicker(setReturnVal)}>
              <Text style={styles.btnText}>File</Text>
            </Pressable>
          </Pressable>

          <Pressable
            onPress={() => {
              setPhotoModal(false);
            }}
            style={[styles.btnContainer, styles.submitButton]}>
            <Text style={styles.btnText}>Submit</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
};

export default FileModal;

// 📷 Open Camera & Convert to Base64
const openCamera = callback => {
  launchCamera({mediaType: 'photo', quality: 1}, async response => {
    if (response.didCancel || response.errorMessage) return;

    const file = response.assets[0];

    if (file.fileSize > 10 * 1024 * 1024) {
      Alert.alert('Image size too large. Select an image under 10MB.');
    } else {
      const base64 = await RNFS.readFile(file.uri, 'base64');
      callback({
        name: file.fileName,
        type: file.type,
        base64: base64,
        uri: file.uri,
      });
    }
  });
};

// 🖼 Open Gallery & Convert to Base64
const openGallery = callback => {
  launchImageLibrary({mediaType: 'photo', quality: 1}, async response => {
    if (response.didCancel || response.errorMessage) return;

    const file = response.assets[0];

    if (file.fileSize > 10 * 1024 * 1024) {
      Alert.alert('Image size too large. Select an image under 10MB.');
    } else {
      const base64 = await RNFS.readFile(file.uri, 'base64');
      callback({
        name: file.fileName,
        type: file.type,
        base64: base64,
        uri: file.uri,
      });
    }
  });
};

// 📂 Open File Picker & Convert PDF to Base64
const openFilePicker = async callback => {
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.pdf],
    });

    const file = res[0];

    if (file.size > 10 * 1024 * 1024) {
      Alert.alert('File size too large. Select a file under 10MB.');
    } else {
      const base64 = await RNFS.readFile(file.uri, 'base64');
      callback({
        name: file.name,
        type: file.type,
        base64: base64,
        uri: file.uri,
      });
    }
  } catch (err) {
    if (!DocumentPicker.isCancel(err)) {
      console.log('FilePicker Error: ', err);
    }
  }
};

// 💅 Styles
const styles = StyleSheet.create({
  modalContent: {
    // backgroundColor: 'rgba(100, 100, 100, 0.5)',
    backgroundColor: 'white',
    padding: 20,
    width: width + 30,
    height: height / 3,
    right: '5%',
    // position: 'absolute',
  },
  btnContainer: {
    width: '100%',
    backgroundColor: 'white',
    height: '100%',
    borderRadius: 15,
    alignItems: 'center',
  },
  btn: {
    height: '33.33%',
    borderBottomWidth: 1,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  btnText: {
    color: '#836FFF',
    fontSize: 16,
    fontWeight: '800',
  },
  fakeHeight: {
    height: height / 1,
    backgroundColor: 'rgba(100, 100, 100, 0.5)',
  },
  submitButton: {
    // borderRadius: 15,
    marginTop: '5%',
    height: '30%',
    justifyContent: 'center',
    width: width + 30,
    alignSelf: 'center',
  },
  absolute: {
    ...StyleSheet.absoluteFillObject,
  },
});
