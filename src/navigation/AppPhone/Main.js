import { TabNavigator, TabBarTop } from 'react-navigation';

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
        tabBarLabel: routeName,
      });
    },
    tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    animationEnabled: false,
    swipeEnabled: true,
  },
);

export default MainTabNavigator;
