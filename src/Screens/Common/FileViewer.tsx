import React, {useEffect, useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import RNFS from 'react-native-fs';
import Pdf from 'react-native-pdf';

const FilePreviewModal = ({visible, onClose, base64Data}) => {
  const [filePath, setFilePath] = useState(null);
  const [isPDF, setIsPDF] = useState(false);

  useEffect(() => {
    if (base64Data && visible) {
      handleBase64(base64Data);
    }
  }, [base64Data, visible]);

  const handleBase64 = async base64 => {
    try {
      if (!base64?.startsWith('data:')) {
        Alert.alert('Invalid data', 'Base64 string is not valid.');
        return;
      }

      const isPdf = base64.startsWith('data:application/pdf;base64,');
      setIsPDF(isPdf);

      if (isPdf) {
        const cleanBase64 = base64.replace(
          /^data:application\/pdf;base64,/,
          '',
        );
        const path = `${RNFS.DocumentDirectoryPath}/preview.pdf`;
        await RNFS.writeFile(path, cleanBase64, 'base64');
        setFilePath(path);
      } else {
        setFilePath(base64); // image base64 string is directly usable
      }
    } catch (err) {
      console.log('Error in handleBase64:', err);
      Alert.alert('Error', 'Could not load preview.');
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            {isPDF
              ? filePath && (
                  <Pdf
                    source={{uri: filePath}}
                    style={styles.pdf}
                    onError={e => console.log('PDF error:', e)}
                  />
                )
              : filePath && (
                  <Image
                    source={{uri: filePath}}
                    style={styles.image}
                    resizeMode="contain"
                  />
                )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilePreviewModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '90%',
    height: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  header: {
    padding: 10,
    alignItems: 'flex-end',
  },
  closeText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    width: '100%',
  },
  image: {
    flex: 1,
    width: '100%',
  },
});
