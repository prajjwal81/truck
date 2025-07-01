import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from '../Navigations/HomeNavigation';
import TripStack from '../Navigations/TripNavigation';
import FinanceStack from '../Navigations/FinanceNavigation';
import HomeIcon from '../../assets/Images/Svg/Home.svg';
import TripsIcon from '../../assets/Images/Svg/Truck.svg';
import AcTruck from '../../assets/Images/Svg/AcTruck.svg';
import FinanceIcon from '../../assets/Images/Svg/Budget.svg';
import AcFinance from '../../assets/Images/Svg/AcFinance.svg';
import AcHome from '../../assets/Images/Svg/AcHome.svg';

const Tab = createBottomTabNavigator();
const {width, height} = Dimensions.get('window');

const TabBarBackground = () => {
  const curveHeight = 30;

  return (
    <View
      style={{
        position: 'absolute',
        top: -curveHeight + 5,
        left: 0,
        width: width,
        height: curveHeight + 10,
        backgroundColor: 'transparent',
      }}>
      {/* <Svg width={width} height={curveHeight + 10}>
        <Path d={path} fill="none" stroke="gray" strokeWidth={1.2} />
      </Svg> */}
    </View>
  );
};

const iconMap = {
  Home: {
    active: () => <AcHome width={94} height={64} />,
    inactive: () => <HomeIcon width={24} height={24} />,
  },
  Trips: {
    active: () => <AcTruck width={94} height={64} />,
    inactive: () => <TripsIcon width={24} height={24} />,
  },
  Finance: {
    active: () => <AcFinance width={94} height={64} />,
    inactive: () => <FinanceIcon width={24} height={24} />,
  },
};

const CustomTabBar = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.container}>
      <TabBarBackground />

      <View style={styles.tabBarContainer}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const label =
            descriptors[route.key].options.tabBarLabel ??
            descriptors[route.key].options.title ??
            route.name;

          const IconComponent = isFocused
            ? iconMap[route.name]?.active
            : iconMap[route.name]?.inactive;

          if (index === 0 || index === 1) {
            return (
              <TouchableOpacity
                key={route.key}
                onPress={() => navigation.navigate(route.name)}
                style={[styles.tabItem]}>
                <View style={isFocused ? styles.iconActive : null}>
                  {IconComponent && <IconComponent />}
                </View>
                <Text
                  style={isFocused ? styles.activeLabel : styles.inactiveLabel}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              style={styles.tabItem}>
              <View style={isFocused ? styles.iconActive : null}>
                {IconComponent && <IconComponent />}
              </View>
              <Text
                style={isFocused ? styles.activeLabel : styles.inactiveLabel}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const BottomTabs = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Trips" component={TripStack} />
      <Tab.Screen name="Finance" component={FinanceStack} />
      {/* <Tab.Screen name="Account" component={AccountStack} /> */}
    </Tab.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: Platform.OS === 'android' ? '8%' : '10%',
    backgroundColor: 'rgba(237, 237, 237, 1)',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  tabBarContainer: {
    flexDirection: 'row',
    position: 'absolute',
    // bottom: 0,
    height: 70,
    width: width,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  iconActive: {
    bottom: '30%',
  },
  activeLabel: {
    color: '#f04f45',
    fontSize: 13,
    fontWeight: 'bold',
    bottom: '20%',
  },

  inactiveLabel: {
    color: '#999',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
});
