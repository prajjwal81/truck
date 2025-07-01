import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../Screens/Home/Home';
import DriversListScreen from '../Screens/Driver/Driverlist';
import AssignTruck from '../Screens/Truck/AssingingTheTruck';
import TruckListScreen from '../Screens/Truck/component/TruckList';
import FavoriteList from '../Screens/Home/Components/Favourites';
import Trip from '../Screens/Trip/Trip';

import EditProfile from '../Screens/Account/Components/EditProfile';
import AccountStack from './AccountNavigation';
import HelpBot from '../Screens/Common/HelpBot';
import TripStack from './TripNavigation';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="DriversListScreen" component={DriversListScreen} />
      <Stack.Screen name="TruckListScreen" component={TruckListScreen} />
      <Stack.Screen name="AssignTruck" component={AssignTruck} />
      <Stack.Screen name="FavoriteList" component={FavoriteList} />
      <Stack.Screen name="TripStack" component={TripStack} />
      <Stack.Screen name="Accounts" component={AccountStack} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="HelpBot" component={HelpBot} />
    </Stack.Navigator>
  );
};

export default HomeStack;
