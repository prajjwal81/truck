import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import I18n from '../../i18n';
import Driver from '../../../assets/Images/Svg/Driver.svg';
import {getItem} from '../../utils/asyncStorage';
import {apiCall2} from '../../API/CustomHook';
import {endpoint} from '../../API/Endpoint';

const DriverModal = ({data}) => {
  const [editableData, setEditableData] = useState(data);
  const [isEditable, setIsEditable] = useState(false);
  const [driverInfo, setDriverInfo] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    idNumber: '',
    dob: '',
    licenseExpiry: '',
    idcard: '',
    dl: '',
    truckId: '',
  });

  const Field = ({labelKey, value}) => (
    <View style={[styles.inputMainContainer]}>
      <Text style={styles.label}>{I18n.t(labelKey)}</Text>
      <Text
        style={[
          styles.inputNew,
          {
            borderColor: isEditable ? 'gray' : 'white',
          },
        ]}>
        {value || '-'}
      </Text>
    </View>
  );

  const FileField = ({labelKey, fileName}) => (
    <View
      style={[
        styles.inputMainContainer,
        {borderColor: isEditable ? 'gray' : 'white'},
      ]}>
      <Text style={styles.label}>{I18n.t(labelKey)}</Text>
      <TouchableOpacity
        disabled={!isEditable}
        onPress={() => {}}
        style={styles.fileTouchable}>
        {fileName ? (
          <View style={styles.fileRow}>
            <Text
              style={styles.linkText}
              numberOfLines={1}
              ellipsizeMode="tail">
              {fileName}
            </Text>
            <Image
              source={{uri: 'https://img.icons8.com/color/48/pdf.png'}}
              style={styles.fileIcon}
            />
          </View>
        ) : (
          <Text style={styles.placeholderText}></Text>
        )}
      </TouchableOpacity>
    </View>
  );

  const confirmHandler = async () => {
    if (isEditable) {
      const auth = await getItem('auth');
      const res = await apiCall2({
        method: 'POST',
        endpoint: endpoint.PostDriver,
        token: auth,
        params: {
          id: 0,
          name: driverInfo.firstName + driverInfo.lastName,
          idNumber: driverInfo.idNumber,
          phoneNumber: driverInfo.phone,
          dob: driverInfo.dob,
          fisrtName: driverInfo.firstName,
          lastName: driverInfo.lastName,
          licenseExpiry: driverInfo.licenseExpiry,
          idCard: driverInfo.idcard,
          driverLicense: driverInfo.dl,
          truckId: driverInfo?.truckId,
        },
      });
      console.log(res);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Driver />
          <Text style={styles.headerText}>Driver Information</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Field labelKey="first_name" value="fisrtName" />
          <Field labelKey="last_name" value="lastName" />
        </View>

        <View style={styles.row}>
          <Field labelKey="id" value="idNumber" />
          <Field labelKey="phone_number" value="phoneNumber" />
        </View>

        <View style={styles.row}>
          <Field labelKey="dob" value="dob" />
          <Field labelKey="license_expiry_date" value="licenseExpiry" />
        </View>

        <View style={styles.row}>
          <Field labelKey="language" value="language" />
          <Field labelKey="password" value="password" />
        </View>

        <View style={styles.row}>
          <FileField labelKey="id_card" fileName="idCard" />
          <FileField labelKey="driving_license" fileName="driverLicense" />
        </View>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            setIsEditable(prev => !prev);
            confirmHandler();
          }}>
          <Text style={styles.editButtonText}>
            {isEditable ? 'Confirm' : 'Edit'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: '5%',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
    marginBottom: '5%',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  inputMainContainer: {
    width: '48%',
    position: 'relative',
    marginBottom: 12,
    paddingTop: 4,
  },
  label: {
    position: 'absolute',
    top: -10,
    left: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 4,
    fontSize: 12,
    color: '#A1A1A1',
    zIndex: 1,
  },
  inputNew: {
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    color: '#000',
    minHeight: 50,
  },
  editButton: {
    marginTop: 16,
    backgroundColor: '#EC1E27',
    padding: 14,
    borderRadius: 30,
    alignItems: 'center',
    width: '50%',
    alignSelf: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  fileTouchable: {
    minHeight: 50,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  fileIcon: {
    width: 20,
    height: 20,
    marginRight: 6,
  },
  linkText: {
    color: '#000',
    textDecorationLine: 'underline',
  },
  placeholderText: {
    fontSize: 16,
    color: '#aaa',
  },
});

export default DriverModal;
