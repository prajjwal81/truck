import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import I18n from '../../i18n';

const CommonSelectDropdown = ({
  label,
  value,
  onSelect,
  list,
  containerStyle,
  activeLabel,
  setActiveLabel,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelect = item => {
    setShowDropdown(!showDropdown);
    onSelect(item);
  };

  useEffect(() => {
    if (activeLabel !== label) {
      setShowDropdown(false);
    }
  }, [activeLabel]);

  const isOpen = activeLabel === label;
  return (
    <View style={[styles.wrapper, containerStyle]}>
      <Pressable
        style={styles.inputMainContainer}
        onPress={() => {
          onSelect();
          setShowDropdown(prev => !prev);
          if (isOpen) {
            setActiveLabel(null);
          } else {
            setActiveLabel(label);
          }
        }}>
        <View style={[styles.fileRow, {top: '15%'}]}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.value}>
            {value}
          </Text>
          <Text style={styles.down}>˅</Text>
        </View>
        <Text style={styles.label}>{I18n.t(label)}</Text>

        {list.length !== 0 && showDropdown && (
          <View style={styles.dropdown}>
            <FlatList
              data={list}
              keyExtractor={(item, index) => index.toString()}
              style={{maxHeight: '40%'}}
              nestedScrollEnabled
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleSelect(item)}>
                  <Text style={styles.dropdownText}>{item.text || item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {top: '1.5%'},
  inputMainContainer: {
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    position: 'relative',
    borderWidth: 0.5,
    borderColor: 'gray',
    minHeight: 50,
    justifyContent: 'center',
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
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontSize: 16,
    color: '#000',
    flex: 1,
    top: '-15%',
  },
  down: {
    fontSize: 30,
    color: 'gray',
    fontWeight: '600',
    top: '-15%',
  },
  dropdown: {
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: 'gray',
    maxHeight: Dimensions.get('window').height / 1.5,
    position: 'absolute',
    zIndex: 10,
    width: '100%',
    alignSelf: 'center',
    top: '60%',
  },
  dropdownItem: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: '#eee',
  },
  dropdownText: {
    fontSize: 16,
    color: '#000',
  },
});

export default CommonSelectDropdown;
