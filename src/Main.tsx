import React, {useEffect, useState} from 'react';
import {I18nManager} from 'react-native';
import AuthStack from './Navigations/AuthStack';
import BottomTabs from './Stack/BottomStack';
import {getItem} from './utils/asyncStorage';
import I18n from './i18n';
import RNRestart from 'react-native-restart';

const Main = () => {
  const [auth, setAuth] = useState(null);
  const [appReady, setAppReady] = useState(false);
  // const [localeLoaded, setLocaleLoaded] = useState(false);/

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Load language
        const lang = await getItem('APP_LANGUAGE');
        const isRTL = lang === 'ar';
        if (lang) {
          I18n.locale = lang;
          if (I18nManager.isRTL !== isRTL) {
            await I18nManager.forceRTL(isRTL);
            RNRestart.Restart();
            return; // prevent continuing if restart
          }
        }

        // Load auth
        const storedAuth = await getItem('auth');
        setAuth(storedAuth);
      } catch (err) {
        console.error('Initialization error:', err);
      } finally {
        setAppReady(true);
      }
    };

    initializeApp();
  }, []);

  if (!appReady) return null; // or show splash screen

  return auth ? <BottomTabs /> : <AuthStack />;
};

export default Main;
