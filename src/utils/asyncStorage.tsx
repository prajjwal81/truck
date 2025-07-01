import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItem = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    console.log('Data Saved');
  } catch (error) {
    console.error('Error', error);
  }
};

export const getItem = async (key: string) => {
  try {
    const user = await AsyncStorage.getItem(key);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error retrieving data:', error);
  }
};

export const clearItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log('User data cleared');
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};

// clearItem('UserDetail');
