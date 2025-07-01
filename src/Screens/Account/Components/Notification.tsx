import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Switch,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import I18n from '../../../i18n';
import {useNavigation} from '@react-navigation/native';

const notifications = [
  {id: '1', time: '22 min ago', message: I18n.t('trip_booked')},
  {id: '2', time: '40 min ago', message: I18n.t('trip_booked')},
  {id: '3', time: '2 hrs ago', message: I18n.t('trip_booked')},
  {id: '4', time: '1 week ago', message: I18n.t('trip_booked')},
];

const NotificationScreen = () => {
  const [enabled, setEnabled] = React.useState(true);
  const toggleSwitch = () => setEnabled(prev => !prev);
  const navigation = useNavigation();

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Text style={styles.time}>{item.time}</Text>
      <Text style={styles.message}>• {item.message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Pressable
        style={styles.header}
        onPress={() => {
          navigation.goBack();
        }}>
        <Ionicons name="arrow-back" size={24} color="#333" />
        <Text style={styles.headerTitle}>{I18n.t('notifications')}</Text>
      </Pressable>

      {/* Notification Switch */}
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>{I18n.t('notifications')}</Text>
        {/* <Ionicons name="notifications" size={22} color="#000" /> */}
        <Switch value={enabled} onValueChange={toggleSwitch} />
      </View>

      {/* List */}
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', padding: 16, paddingTop: '15%'},
  header: {flexDirection: 'row', alignItems: 'center', marginBottom: 20},
  headerTitle: {fontSize: 20, fontWeight: '600', marginLeft: 10},
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: '#f3f3f3',
    borderRadius: 8,
  },
  switchLabel: {fontSize: 16, fontWeight: '500'},
  listContainer: {marginTop: 20},
  item: {paddingVertical: 14, borderBottomWidth: 0.5, borderColor: '#ccc'},
  time: {fontSize: 12, color: '#999', marginBottom: 4},
  message: {fontSize: 14, color: '#333'},
});
