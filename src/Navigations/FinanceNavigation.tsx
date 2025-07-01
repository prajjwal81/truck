import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Finance from '../Screens/Finance/Finance';
import WalletWithdrawScreen from '../Screens/Finance/Components/WidrawBalance';
import ReportsScreen from '../Screens/Finance/Components/ReportScreen';
import AccountStatement from '../Screens/Finance/Components/AccountStatement';

const Stack = createNativeStackNavigator();

const FinanceStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Finance" component={Finance} />
      <Stack.Screen name="ReportsScreen" component={ReportsScreen} />
      <Stack.Screen name="AccountStatement" component={AccountStatement} />
      <Stack.Screen
        name="WalletWithdrawScreen"
        component={WalletWithdrawScreen}
      />
    </Stack.Navigator>
  );
};

export default FinanceStack;
