import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../../constants/Colors';

import AppHomeScreen from '../../screens/phonesize/AppHomeScreen';
import LinksScreen from '../../screens/LinksScreen';
import SettingsScreen from '../../screens/SettingsScreen';

const MainTabNavigator = TabNavigator(
  {
    Home: {
      screen: AppHomeScreen,
    },
    Links: {
      screen: LinksScreen,
    },
    Settings: {
      screen: SettingsScreen,
    },
  },
  {
    navigationOptions: (parm) => {
      const { navigation } = parm;
      const { routeName } = navigation.state;

      return ({
        tabBarIcon: (param) => { // eslint-disable-line react/prop-types
          const { focused } = param;
          let iconName;
          switch (routeName) {
            case 'Home':
              iconName = `ios-information-circle${focused ? '' : '-outline'}`;
              break;
            case 'Links':
              iconName = `ios-link${focused ? '' : '-outline'}`;
              break;
            case 'Settings':
              iconName = `ios-options${focused ? '' : '-outline'}`;
              break;
            default:
              break;
          }
          return (
            <Ionicons
              name={iconName}
              size={28}
              style={{ marginBottom: -3 }}
              color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            />
          );
        },
        tabBarLabel: routeName,
      });
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  },
);

export default MainTabNavigator;
