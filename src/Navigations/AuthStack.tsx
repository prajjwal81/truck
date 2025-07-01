import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen1 from '../Screens/Splashscreen/SplashScreen1';
import SplashScreen2 from '../Screens/Splashscreen/SplashScreen2';
import Login from '../Screens/Auth/Login';
import LoginAsScreen from '../Screens/Auth/LoginAs';
import SignUp from '../Screens/Auth/Signup';
import BottomTabs from '../Stack/BottomStack';
import ForgotPass from '../Screens/Auth/ForgotPassword';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SplashScreen1" component={SplashScreen1} />
      <Stack.Screen name="SplashScreen2" component={SplashScreen2} />
      <Stack.Screen name="LoginAsScreen" component={LoginAsScreen} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen name="ForgotPass" component={ForgotPass} />
    </Stack.Navigator>
  );
};

export default AuthStack;
