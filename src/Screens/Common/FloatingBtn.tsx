import React, {useState} from 'react';
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {CairoBold, CairoSemiBold} from '../../utils/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Robot from '../../../assets/Images/Svg/Robot.svg';
import Banking from '../../../assets/Images/Svg/Banking.svg';
import CustomerService from '../../../assets/Images/Svg/CustomerService.svg';
import TechnicalSupport from '../../../assets/Images/Svg/TechnicalSupport.svg';
import I18n from '../../i18n';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const FloatingHelpButton = () => {
  const navigation = useNavigation();
  const [isFirstModalVisible, setFirstModalVisible] = useState(false);
  const [isSecondModalVisible, setSecondModalVisible] = useState(false);

  const openFirstModal = () => setFirstModalVisible(true);
  const closeFirstModal = () => setFirstModalVisible(false);

  const openSecondModal = () => {
    setFirstModalVisible(false);
    setSecondModalVisible(true);
  };

  const closeSecondModal = () => setSecondModalVisible(false);

  return (
    <>
      {/* Floating Button */}
      <TouchableOpacity onPress={openFirstModal} style={styles.floatingButton}>
        <Robot />
      </TouchableOpacity>

      {/* First Modal */}
      <Modal transparent visible={isFirstModalVisible} animationType="fade">
        <BlurView
          style={styles.blurContainer}
          blurType="ultraThinMaterial"
          blurAmount={5}
        />

        <View
          style={[
            styles.modalContainer,
            {width: '100%', flexDirection: 'row'},
          ]}>
          <View style={styles.floatingButton}>
            <Robot />
          </View>
          <View style={styles.modalContainer2}>
            <Text style={styles.modalText}>{I18n.t('hello')}</Text>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={openSecondModal}>
                <Text style={styles.modalButtonText}>{I18n.t('needHelp')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={closeFirstModal}
                style={[styles.modalButton, styles.cancelButton]}>
                <Text style={styles.modalButtonText}>
                  {I18n.t('noThankYou')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Second Modal */}
      <Modal transparent visible={isSecondModalVisible} animationType="slide">
        <BlurView
          style={styles.blurContainer}
          blurType="light"
          blurAmount={6}
        />
        <View style={styles.overlay}>
          <View style={styles.modalContainer3}>
            {/* Top bot icon and close button */}
            <View style={styles.topRow}>
              <View style={{left: width / 2.5, top: '-10%'}}>
                <Robot style={[styles.botIcon]} />
              </View>
              <TouchableOpacity onPress={closeSecondModal}>
                <AntDesign name="closecircle" size={34} color="red" />
              </TouchableOpacity>
            </View>

            <Text style={styles.title}>{I18n.t('howCanWeHelpYou')}</Text>

            {/* Options */}
            <TouchableOpacity
              style={styles.optionBtn}
              onPress={() => {
                closeSecondModal();
                navigation.navigate('HelpBot', {text: 'accountingAssistant'});
              }}>
              <Banking style={styles.icon} />
              <Text style={styles.btnText}>
                {I18n.t('accountingAssistant')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionBtn}
              onPress={() => {
                closeSecondModal();
                navigation.navigate('HelpBot', {text: 'technicalSupport'});
              }}>
              <TechnicalSupport style={styles.icon} />
              <Text style={styles.btnText}>{I18n.t('technicalSupport')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionBtn}
              onPress={() => {
                closeSecondModal();
                navigation.navigate('HelpBot', {text: 'customerService'});
              }}>
              <CustomerService style={styles.icon} />
              <Text style={styles.btnText}>{I18n.t('customerService')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default FloatingHelpButton;

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    left: 20,
    bottom: '15%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    zIndex: 100,
  },
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  modalContainer: {
    position: 'absolute',
    top: height / 1.5,
    alignSelf: 'center',
    width: width * 0.8,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
    zIndex: 2,
  },
  modalContainer2: {
    alignSelf: 'center',
    width: width / 1.3,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    elevation: 10,
    zIndex: 2,
    left: '35%',
    top: '-5%',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    fontFamily: CairoSemiBold,
  },
  modalButton: {
    backgroundColor: '#8ED99E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 10,
  },
  modalButtonText: {
    color: 'black',
    fontFamily: CairoSemiBold,
  },
  cancelButton: {
    backgroundColor: 'white',
    borderWidth: 0.3,
  },
  cancelText: {
    color: '#555',
    fontWeight: '500',
  },
  textInput: {
    width: '100%',
    minHeight: 80,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    textAlignVertical: 'top',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  modalContainer3: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    width: '99%',
    alignItems: 'center',
    top: '25%',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  botIcon: {
    width: 40,
    height: 40,
  },
  closeIcon: {
    fontSize: 22,
  },
  title: {
    marginTop: 10,
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
    fontFamily: CairoBold,
  },
  optionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginVertical: 6,
    width: '100%',
    borderWidth: 2,
    borderColor: '#eee',
    justifyContent: 'center',
    fontFamily: CairoBold,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
