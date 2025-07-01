import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Accounts from '../Screens/Account/Account';
import LanguageSelector from '../Screens/Account/Components/Language';
import HomeStack from './HomeNavigation';
import PasswordResetScreen from '../Screens/Account/Components/ChangePassword';
import NotificationScreen from '../Screens/Account/Components/Notification';
import Faq from '../Screens/Account/Components/Faq';
import ContactUs from '../Screens/Account/Components/ContactUs';
import Login from '../Screens/Auth/Login';
import LoginAsScreen from '../Screens/Auth/LoginAs';

const Stack = createNativeStackNavigator();

const AccountStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Accounts" component={Accounts} />
      <Stack.Screen name="LanguageSelector" component={LanguageSelector} />
      <Stack.Screen name="HomeStack" component={HomeStack} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="Faq" component={Faq} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="LoginAsScreen" component={LoginAsScreen} />
      <Stack.Screen
        name="PasswordResetScreen"
        component={PasswordResetScreen}
      />
    </Stack.Navigator>
  );
};

export default AccountStack;
