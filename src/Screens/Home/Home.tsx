import React from 'react';
import {Text, View} from 'react-native';
import HomeScreenHero from './Components/Hero';

const Home = () => {
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <HomeScreenHero />
    </View>
  );
};
export default Home;
