import { View } from 'react-native';
import { TabNavigator, TabBarTop } from 'react-navigation';

import WebHomeScreen from '../../screens/monitorsize/WebHomeScreen';
import AppHomeScreen from '../../screens/monitorsize/AppHomeScreen';

import WebDocumentationScreen from '../../screens/WebDocumentationScreen';
import LinksScreen from '../../screens/LinksScreen';
import SettingsScreen from '../../screens/SettingsScreen';

const WebMainTabNavigator = TabNavigator(
  {
    WebHome: {
      screen: WebHomeScreen,
    },
    Documentation: {
      screen: WebDocumentationScreen,
    },
    AppHome: {
      screen: AppHomeScreen,
    },
    Links: {
      screen: LinksScreen,
    },
    Settings: {
      screen: SettingsScreen,
    },
    LoginOut: {
      screen: View,
    },
  },
  {
    navigationOptions: (parm) => {
      const { screenProps, navigation } = parm;
      const { routeName } = navigation.state;
      let label = routeName;
      const appRoutes = ['AppHome', 'Links', 'Settings'];

      if (routeName === 'LoginOut') {
        label = screenProps.currentUser ? 'Logout' : 'Login/Signup';
      }
      if (appRoutes.includes(routeName) && !screenProps.currentUser) {
        label = ' ';
      }
      return ({
        tabBarLabel: label,
        tabBarOnPress: ({ /* previousScene, */ scene, jumpToIndex }) => {
          if (scene.route.routeName === 'LoginOut') {
            if (screenProps.currentUser) {
              screenProps.doLogout();
            } else {
              screenProps.doLogin();
            }
          }
          if (appRoutes.includes(routeName) && !screenProps.currentUser) {
            return;
          }
          jumpToIndex(scene.index);
        },
        header: null,
      });
    },
    tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      upperCaseLabel: false,
    },
  },
);

export default WebMainTabNavigator;
