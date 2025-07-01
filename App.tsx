import React from 'react';
import {I18nManager, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import './src/i18n';
import Main from './src/Main';

function App() {
  I18nManager.allowRTL(false);
  I18nManager.forceRTL(false);
  return (
    <NavigationContainer>
      <View style={{flex: 1}}>
        <Main />
      </View>
    </NavigationContainer>
  );
}

export default App;
