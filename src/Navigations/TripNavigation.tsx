import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Trip from '../Screens/Trip/Trip';
import BookTripModal from '../Screens/Trip/Components/BooktripModalScreen';

const Stack = createNativeStackNavigator();

const TripStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Trip" component={Trip} />
      <Stack.Screen name="BookTripModal" component={BookTripModal} />
    </Stack.Navigator>
  );
};

export default TripStack;
