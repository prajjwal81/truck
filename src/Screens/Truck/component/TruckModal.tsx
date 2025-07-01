import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import {CairoRegular} from '../../../utils/fonts';
import FilePreviewModal from '../../Common/FileViewer';
import I18n from '../../../i18n';

const TruckModal = ({data}) => {
  const [showPreview, setShowPreview] = useState(false);
  const [yourBase64, setYourBase64] = useState('');
  const [edit, setEdit] = useState(false);

  const Field = ({labelKey, value}) => (
    <View
      style={[
        styles.inputMainContainer,
        {
          borderColor: edit ? 'gray' : 'white',
        },
      ]}>
      <Text style={styles.label}>{I18n.t(labelKey)}</Text>
      <Text style={styles.inputNew}>{value || '-'}</Text>
    </View>
  );

  const FileField = ({labelKey, fileName}) => (
    <View
      style={[
        styles.inputMainContainer,
        {borderColor: edit ? 'gray' : 'white'},
      ]}>
      <Text style={styles.label}>{I18n.t(labelKey)}</Text>
      <TouchableOpacity
        disabled={!edit}
        onPress={() => {
          modalHandler(); // you can replace with your actual modal logic
        }}
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

  const handleBase64 = text => {
    setShowPreview(prev => !prev);
    setYourBase64(text);
  };

  const modalHandler = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Image
            source={{
              uri: 'https://img.icons8.com/ios-filled/50/000000/truck.png',
            }}
            style={styles.icon}
          />
          <Text style={styles.headerText}>Truck Information</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Field labelKey="truck_type" value={data?.truckTypeName} />
          <Field
            labelKey="plate_number"
            value={`${data?.plateNumberAlpha} ${data?.platenumber}`}
          />
        </View>

        <View style={styles.row}>
          <Field labelKey="sequence_number" value={data?.sequenceNumber} />
          <Field labelKey="brand" value={data?.brandName} />
        </View>

        <View style={styles.row}>
          <Field
            labelKey="manufacturing_year"
            value={data?.manyfacturingYear}
          />
          <Field labelKey="axis_number" value={data?.axisNumber} />
        </View>

        <View style={styles.row}>
          <Field labelKey="color" value={data?.colorName} />
          <View style={{width: '48%', flexDirection: 'row'}}>
            <Field labelKey="weight" value={data?.weight} />
            <Field labelKey="width" value={data?.width} />
          </View>
        </View>

        <View style={styles.row}>
          <FileField
            labelKey="vehicle_registration"
            fileName={data?.vehicleRegistration}
          />
          <FileField labelKey="operating_card" fileName={data?.operatingCard} />
        </View>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            setEdit(prev => !prev);
          }}>
          <Text style={styles.editButtonText}>Edit</Text>
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
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  field: {
    flex: 1,
    minWidth: '45%',
    marginRight: 12,
    marginBottom: 8,
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
  value: {
    fontSize: 16,
    fontFamily: CairoRegular,
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
  editButton: {
    marginTop: 16,
    backgroundColor: '#e53935',
    padding: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  inputMainContainer: {
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    position: 'relative',
    borderWidth: 0.5,
    borderColor: 'gray',
    // flex: 1,
    width: '48%',
    marginRight: '2%',
  },

  inputNew: {
    fontSize: 16,
    color: '#000',
    minHeight: 50,
    paddingTop: 10,
  },

  fileTouchable: {
    minHeight: 50,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  placeholderText: {
    fontSize: 16,
    color: '#aaa',
  },
});

export default TruckModal;
